import os
import fabric
from fabric.state import env
from fabric.api import run, sudo, cd, task, roles, runs_once, local, lcd


env.roledefs = {
    'lascom': ['lascom@188.226.241.50'],
}
env.colorize_errors = True
env.forward_agent = True


VARS = dict(
    proj_dir='/home/lascom/app'
)


@task
@roles('lascom')
def prepare():
    with cd(VARS['proj_dir']):
        run('git clone git@github.com:WB-Tecnologies/lascom.git .')
        run('virtualenv venv')
        run('venv/bin/pip install -r requirements.txt')
        run('npm i')


@task
@roles('lascom')
def deploy():
    with cd(VARS['proj_dir']):
        run('git pull')
        run('venv/bin/pip install -r requirements.txt')
        run('npm i')
        run('npm run build')
        sudo('supervisorctl restart lascom')
    register_deployment(os.path.dirname(__file__))


@task
@runs_once
def register_deployment(git_path):
    with(lcd(git_path)):
        revision = local('git log -n 1 --pretty="format:%H"', capture=True)
        branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
        local('curl -XPOST http://alerts.wbtech.pro/api/hooks/release/builtin/9/3b4e9064e499ce787610d2764eb98eb085bcd3ebf98f430e583db3772dc285c6/'
              ' -H "Content-Type: application/json"'
              ' -d \'{{"version": "{}@{}"}}\''.format(branch, revision))

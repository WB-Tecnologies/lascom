import fabric
from fabric.state import env
from fabric.api import run, sudo, cd, task, roles


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

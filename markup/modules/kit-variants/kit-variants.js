let $tableContent = $('.kit-table_row');

removeTextNodes();

function removeTextNodes() {
    $tableContent.contents().filter(() => {
        return this.nodeType === 3;
    }).remove();
}

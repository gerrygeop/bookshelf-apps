function search() {
    const search = document.getElementById('searchBook').value.toLocaleLowerCase();
    const itemList = document.querySelectorAll('.item-list');
    let item;

    let title;
    let titleValue;

    for (let j = 0; j < itemList.length; j++) {
        item = itemList[j].getElementsByClassName("item");
        
        for (let i = 0; i < item.length; i++) {
            title = item[i].getElementsByTagName('h3')[0];

            if (title) {
                titleValue = title.textContent || title.innerText;
                titleValue = titleValue.toLocaleLowerCase();

                if (titleValue.indexOf(search) > -1) {
                    item[i].style.display = "";
                } else {
                    item[i].style.display = "none";
                }
            }
        }
        
    }
};

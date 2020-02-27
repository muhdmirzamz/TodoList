var todoList = [];


function reloadPage() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/retrieveData", true); // true for asynchronous 
    request.send(null);

    request.onload = function() {
        var jObject = JSON.parse(request.response);

        document.getElementById('category-title-text').innerHTML = jObject.category;

        for (var i = 0; i < jObject.items.length; i++) {
            todoList.push(jObject.items[i]);
        }

        if (todoList.length > 0) {
            for (var i = 0; i < todoList.length; i++) {
                var referenceNode = document.getElementsByClassName('category-title')[0];
    
                var divNode = document.createElement('div');
                divNode.setAttribute("class", "category-item");
                
                var text = document.createTextNode(todoList[i]);
                divNode.appendChild(text);
    
    
                if (i > 0) {
                    var childrenCount = document.getElementsByClassName('category-item').length;
    
                    referenceNode = document.getElementsByClassName("category-item")[childrenCount-1];
                }
    
    
                // https://www.w3schools.com/jsref/met_node_insertbefore.asp
                // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
                referenceNode.parentNode.insertBefore(divNode, referenceNode.nextSibling);
            }
        }
    }


    // https://www.geeksforgeeks.org/hide-or-show-elements-in-html-using-display-property/
    // https://www.geeksforgeeks.org/hide-or-show-html-elements-using-visibility-property-in-javascript/
    document.getElementsByClassName('category-input-panel')[0].style.display = 'none';
}

function activateFieldToAddItem() {
    document.getElementsByClassName('category-input-panel')[0].style.display = 'block';
    document.getElementsByClassName('category-input-placeholder')[0].style.display = 'none';

    document.getElementById('item-input').focus();
}

function deactivateFieldToAddItem() {
    document.getElementsByClassName('category-input-panel')[0].style.display = 'none';
    document.getElementsByClassName('category-input-placeholder')[0].style.display = 'block';
}

function addItem() {
    var inputValue = document.getElementById('item-input').value;

    var divNode = document.createElement('div');
    divNode.setAttribute("class", "category-item");
    
    var text = document.createTextNode(inputValue);
    divNode.appendChild(text);

    todoList.push(inputValue);

    var childrenCount = document.getElementsByClassName('category-item').length;
    var referenceNode = document.getElementsByClassName("category-item")[childrenCount-1];
    referenceNode.parentNode.insertBefore(divNode, referenceNode.nextSibling);

    document.getElementById('item-input').value = "";

    window.location = "/index.html?item=" + inputValue;
}


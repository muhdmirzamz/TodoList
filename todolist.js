function reloadPage() {
    console.log("Getting started");

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/retrieveData", true); // true for asynchronous 
    request.send(null);

    request.onload = function() {
        console.log("Getting finished");

        var jObject = JSON.parse(request.response);

        document.getElementById('category-title-text').innerHTML = jObject.category;


        // remember to clear items with class name
        // these items do not sync with json file after adding more items
        var items = document.getElementsByClassName('category-item');

        while (items.length > 0) {
            // https://stackoverflow.com/a/14066534
            // items array will shrink with every removal
            items[0].parentNode.removeChild(items[0]);
        }

        if (jObject.items.length > 0) {
            for (var i = 0; i < jObject.items.length; i++) {
                var referenceNode = document.getElementsByClassName('category-title')[0];
    
                var divNode = document.createElement('div');
                divNode.setAttribute("class", "category-item");
                
                var text = document.createTextNode(jObject.items[i]);
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
    document.getElementsByClassName('category-input-placeholder')[0].style.display = 'block';
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

    document.getElementById('item-input').value = "";

    // https://stackoverflow.com/a/38982661
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/sendData", true); // true for asynchronous 
    request.setRequestHeader('Content-Type', 'text/html');
    request.send(inputValue);

    request.onload = function() {
        reloadPage();
    }
}


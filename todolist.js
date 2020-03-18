function reloadPage() {
    console.log("Getting started");

    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/retrieveData", true); // true for asynchronous 
    request.send(null);

    request.onload = function() {
        console.log("Getting finished");

        var jObject = JSON.parse(request.response);


        console.log("jObject: " + JSON.stringify(jObject));

        // find the number of objects in the json object
        if (jObject.categories != null) {
            console.log("Total categories: " + jObject.categories.length);

            if (jObject.categories.length > 0) {

                for (var i = 0; i < jObject.categories.length + 1; i++) {
                    console.log("index: " + i);

                    var categoryPanelDivNode = document.getElementsByClassName('category-panel')[i];

                    // because each category has a root div for us to work with
                    if (categoryPanelDivNode != null) {
                        var categoryTitleDivNode = document.getElementsByClassName('category-title')[i];

                        console.log("category panel is not null");

                        if (categoryTitleDivNode == null) {
                            console.log("category panel is null");

                            var categoryTitleDivNode = document.createElement('div');
                            categoryTitleDivNode.setAttribute("class", "category-title");
                            categoryTitleDivNode.style.display = 'block';

                            var pNode = document.createElement('p');
                            pNode.setAttribute("id", "category-title-text");
                            var text = document.createTextNode(jObject.categories[i].name);
                            pNode.appendChild(text);

                            categoryTitleDivNode.appendChild(pNode);

                            var referenceNode = document.getElementsByClassName('category-input-placeholder')[i];
                            referenceNode.parentNode.insertBefore(categoryTitleDivNode, referenceNode);
                        }

                        console.log("category panel is not null");
        
                        // remember to clear items with class name
                        // these items do not sync with json file after adding more items
                        var items = document.getElementsByClassName('category-panel')[i].getElementsByClassName('category-item');

                        console.log("item count: " + items.length);

        
                        while (items.length > 0) {
                            // https://stackoverflow.com/a/14066534
                            // items array will shrink with every removal
                            items[0].parentNode.removeChild(items[0]);
                        }


                        console.log("category items length: " + jObject.categories[i].items.length);
        

                        for (var j = 0; j < jObject.categories[i].items.length; j++) {
                            var referenceNode = document.getElementsByClassName('category-title')[i];
                        
                            var divNode = document.createElement('div');
                            divNode.setAttribute("class", "category-item");
                            
                            var text = document.createTextNode(jObject.categories[i].items[j].name);

                            console.log("category item is: " + jObject.categories[i].items[j].name);

                            divNode.appendChild(text);
        
        
                            if (j > 0) {
                                var childrenCount = items.length;
        
                                referenceNode = document.getElementsByClassName("category-item")[childrenCount-1];
                            }
        
        
                            // https://www.w3schools.com/jsref/met_node_insertbefore.asp
                            // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
                            referenceNode.parentNode.insertBefore(divNode, referenceNode.nextSibling);
                        }



                        
                        // https://www.geeksforgeeks.org/hide-or-show-elements-in-html-using-display-property/
                        // https://www.geeksforgeeks.org/hide-or-show-html-elements-using-visibility-property-in-javascript/
                        var categoryInputPanels = document.getElementsByClassName('category-input-panel');
                        categoryInputPanels[i].style.display = 'none';
            
                        var categoryInputPlaceholders = document.getElementsByClassName('category-input-placeholder');
                        categoryInputPlaceholders[i].style.display = 'block';
                    } else {  // if a new category exists but there is no div

                        console.log("category panel is null");

                        // clone the list node before it
                        var categoryPanelList = document.getElementsByClassName('category-panel-list')[i - 1];
                        var newcategoryPanelList = categoryPanelList.cloneNode(true);

                        document.getElementsByTagName('ul')[0].appendChild(newcategoryPanelList);

                        document.getElementsByClassName('category-panel')[i].querySelector('#item-input').value = "";

                        // clear the items in the list
                        var items = document.getElementsByClassName('category-panel')[i].getElementsByClassName('category-item');
        
                        while (items.length > 0) {
                            // https://stackoverflow.com/a/14066534
                            // items array will shrink with every removal
                            items[0].parentNode.removeChild(items[0]);
                        }


                        if (i < jObject.categories.length) {
                            var panel = document.getElementsByClassName('category-panel')[i];
                            var titleDiv = panel.getElementsByClassName('category-title')[0];
                            titleDiv.querySelector('#category-title-text').innerHTML = jObject.categories[i].name;


                            for (var j = 0; j < jObject.categories[i].items.length; j++) {
                                var referenceNode = document.getElementsByClassName('category-title')[i];
                            
                                var divNode = document.createElement('div');
                                divNode.setAttribute("class", "category-item");
                                
                                var text = document.createTextNode(jObject.categories[i].items[j].name);
                                divNode.appendChild(text);
            
            
                                if (j > 0) {
                                    var childrenCount = document.getElementsByClassName('category-item').length;
            
                                    referenceNode = document.getElementsByClassName("category-item")[childrenCount-1];
                                }
            
            
                                // https://www.w3schools.com/jsref/met_node_insertbefore.asp
                                // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
                                referenceNode.parentNode.insertBefore(divNode, referenceNode.nextSibling);
                            }
                        } else {
                            var panel = document.getElementsByClassName('category-panel')[i];
                            var titleDiv = panel.getElementsByClassName('category-title')[0];
                            titleDiv.parentNode.removeChild(titleDiv);
                        }
                    }
                }
            }
        } else { // if number of categories is 0
            var categoryInputPanels = document.getElementsByClassName('category-input-panel')[0];
            categoryInputPanels.style.display = 'none';

            var categoryInputPlaceholders = document.getElementsByClassName('category-input-placeholder')[0];
            categoryInputPlaceholders.style.display = 'block';
        }
    }

    
}

function activateFieldToAddItem(object) {
    // find all elements with specified class name / id
    object.parentNode.querySelectorAll("div.category-input-panel")[0].style.display = 'block';
    object.parentNode.querySelectorAll("div.category-input-placeholder")[0].style.display = 'none';

    object.parentNode.querySelectorAll("textarea#item-input")[0].focus();
}

function deactivateFieldToAddItem(object) {
    object.parentNode.parentNode.querySelectorAll("div.category-input-panel")[0].style.display = 'none';
    object.parentNode.parentNode.querySelectorAll("div.category-input-placeholder")[0].style.display = 'block';
}

function addItem(object) {
    var inputValue = object.parentNode.querySelector('#item-input').value;

    document.getElementById('item-input').value = "";

    // find out which category index the clicked object is from
    var json;
    var index;
    var elementsWithSameClass = document.getElementsByClassName("category-panel");

    for (var i = 0; i < elementsWithSameClass.length; i++) {
        if (elementsWithSameClass[i] === object.parentNode.parentNode) {
            index = i;

            break;
        }
    }

    console.log("Index is here: " + index);



    // find out position of new category
    // get amount of panels / categories for category position
    // var listCount = document.getElementsByClassName("category-panel").length;

    // // category position starts at 0
    // var pos = listCount - 1; 

    // // to account for when list is 0, we do not want a -1 value
    // if (listCount < 0) {
    //     pos = 0;
    // }




    // if category does not have a title
    // that means we are creating a new category
    if (object.parentNode.parentNode.querySelector("p#category-title-text")[0] == null) {

        // .toString()
        // and also the string quotations
        var templateString = '{"name": "' + inputValue.toString() + '", "items": [] }';

        json = JSON.parse(templateString);

        var jsonString = JSON.stringify(json);

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/sendData", true); // true for asynchronous 
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(jsonString);

        request.onload = function() {
            reloadPage();
        }
    }
    
    
    
    
    
    
    
    // else {
    //     var templateString = '{"input": { "pos": "' + index.toString() + '", "item": "' + inputValue.toString() +'" }}';
    //     console.log("Input to be sent: " + templateString);

    //     var json = JSON.parse(templateString);
    //     var jsonString = JSON.stringify(json);


    //     // https://stackoverflow.com/a/38982661
    //     var request = new XMLHttpRequest();
    //     request.open("POST", "http://localhost:8080/sendData", true); // true for asynchronous 
    //     request.setRequestHeader('Content-Type', 'application/json');
    //     request.send(jsonString);

    //     request.onload = function() {
    //         reloadPage();
    //     }
    // }
}


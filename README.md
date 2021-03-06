# TodoList

### A practice project for me to learn Javascript and backend web development


Test cases:
- [x] Able to read in empty json file
- [ ] Able to read in filled json file
- [ ] Able to read in multiple categories
- [x] Able to write to json file
- [ ] Able to write a category
- [ ] Able to write an entry and retrieve said entry from json file
- [ ] Able to write an entry, retrieve said entry and not have duplicates to todo items

18 March 2020:
- Restructured JSON file
- Implemented an extra panel for input to create a new category
- Fixed: An extra panel for input now has an empty ```<textarea>```. Previously, it carried the title of the previous category.
- Fixed: Buttons used for input used to be skewed to right of ```<textarea>```. Now fixed to bottom of ```<textarea>```.
- Fixed: Creating a new category would erase the items of the previous category and append an extra text node with the category's title.

12 March 2020:
- Horizontal scrolling is implemented

29 February 2020: 
- You can now add to the list
- Refactored the way the list updates and retrieves the items
- Fixed: Website would freeze upon creating first item
- Fixed: Website would not show input field placeholder after first item insert

27 February 2020:
- Todo list now reads JSON from file, parses and renders onto website

25 February 2020:
- Changed ```<input>``` tag to ```<textarea>```
- ```<textarea>``` now starts off active when user wants to add item
- Now able to pass data to server-side

24 February 2020:
- Initial commit
- Base framework is done
- You can add to the todo list

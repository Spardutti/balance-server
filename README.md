# Balance!

[Live Project](https://spardutti.github.io/balance-client/#/).

[Client repo](https://github.com/Spardutti/balance-client)

# Tools

This project whas made with: ReactJs, Sass, MongoDB, Express, Node, Javascript, Reacstrap, React-router

# The Project

Here you will be able to keep track of your daily expenses, and see a total at the end of the months.
I used the current date to add the items and store them in the current month/year, it will automatically create new months and year as needed.
All items need a folder, that way you can look up a specific month/year and check all the items in that specific folder.
You can edit and delete items, in order to delete a folder i decided that you first need to remove all items that belong to that folder,
to avoid deleting items accidentaly.

The first challenge was how to set up the item model and how to filter them by dates, which in the end was no that much of a challenge,
i decided to store each item with the current year and month, and the retrieve them by specific user, year and month.

Everytime you log in it will fetch the data of the current month, if the user wants, he can check others months but wont be able to add items to older months.

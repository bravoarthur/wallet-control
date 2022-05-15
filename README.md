- Project developed using Functional Components, React Router Dom, Material UI and Styled Components.

- The project is used to make easy to check the evaluation of an investment wallet. You can choose the wallet/user name and check the stock list. Once the button refresh is pressed, it refreshes all the prices getting it at Yahoo Finance. It allows to include new stock, delete if needed and sell them. All the stocks sold generates a list of transactions where you can check the profits.
- Each Stock has their own Page with specific Information

- The Library Material UI has been used to style some modules as Styled components

- One of the modules uses Promises to fetch the actual stock prices from Yahoo Finance API.

- When including a new stock, it first check if the specific stock already exists in the list, once it exist the amount is refreshed as the average price. If the stock is not in the list, it is just included.

- All changes done by the user shows a snack bar confirming for the user if the operation has been successful.

- All Modules has the respective test file.

Using any programming language you'd like, build a solution to provide the subtotal, taxes, and total for a specific order given an order id accounting for the quantities of each item in the order and the taxes associated with the city of the customer.

Your solution should produce output that includes the following information for order sfg47:

Order: sfg47
Customer Name: Johnny Cueto
Subtotal: 9.98
Taxes: 0.72
Total: 10.70

We need to be able to provide an order_id as input (CLI argument, URL param, web form, etc.) and expect to display the output of your code.

The output of your solution does not need to match the above formatting. It can be from stdout, and maybe produces json, or rendered html in a webpage, or anything else as long as the output can be seen and checked for correctness.

The API is partially documented here:

https://code-challenge-i2hz6ik37a-uc.a.run.app/docs

There are endpoints to retrieve the full list of orders, each individual order, a list of the cities, and each of the cities with their associated tax rates. Use the "Try It Out" button to see the actual data.

Prices of items are in cents. Totals should be in dollars and cents.
Tax rates are in percentages (i.e. you'll need to divide by 100 to use them for calculating correct taxes).
Don't forget about the quantities of items
Note: Be careful as some of the items are not taxable. This should be accounted for in your solution.

Post source code of your solution to your code sharing platform of choice: github, bitbucket, gitlab, whatever and send us a link. Or you can send us a zip/gzip file of your code. Please include basic instructions on how to run/test your solution.



# Order Lookup
This is a feature to view order totals, subtotals, and taxes when looking up an order

## Development
## Server API

### Get order info
  * GET `/api/orders/:orderId`

**Path Parameters:**
  * `orderId` order id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
    "status": 200,
    "success": true,
    "message": "String",
    "data": {
        "order": "String",
        "customerName": "String",
        "taxes": "String",
        "subTotal": "String",
        "total": "String"
    }
}
```

**Success Status Code:** `500`

**Returns:** JSON

```json
    {
    "status": 500,
    "success": false,
    "message": "String",
    "data": {}
}
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Testing Service

```sh
npm run build
npm run start
```


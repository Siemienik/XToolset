# ExpressJS

This is an example how to use `xlsx-import` in node + express.

**LIB Version:** `2.3.1`

## Usage

```shell script
# install dependencies
npm install

# start server
npm start

# switch to another terminal and run curl command
curl -X POST -F "invoice=@invoice.xlsx" http://localhost:3000/api/v1/invoice/parse
```

Response from server (pretty printed)

```json
{
  "status": "ok",
  "payload": {
    "date": "2020-10-08T00:00:00.000Z",
    "dueDate": "2020-10-29T00:00:00.000Z",
    "seller": {
      "name": "Krupnik LTD.",
      "taxIdNumber": "123456789",
      "address": "ul. Usbewifi 5/G, MiastoNaK",
      "accountNo": "PL 12 1234 1234 1234 1234 1234 1234"
    },
    "buyer": {
      "name": "Bigos INC.",
      "taxIdNumber": "987654321",
      "address": "ul. Agiede 2020, MiastoNaK"
    },
    "items": [
      {
        "item": "Mleczko do prania",
        "unitPrice": 16.45,
        "quantity": 2,
        "price": 32.9
      },
      {
        "item": "Płyn do płukania",
        "unitPrice": 14.55,
        "quantity": 1,
        "price": 14.55
      },
      {
        "item": "Pokarm dla smoka",
        "unitPrice": 79.99,
        "quantity": 10,
        "price": 799.9
      },
      {
        "item": "Instrukcja jak latać na smoku",
        "unitPrice": 19.89,
        "quantity": 1,
        "price": 19.89
      }
    ],
    "total": 867.24
  }
}
```

## What happened

1. Server launched
2. Request containing xlsx invoice file sent to the server
3. Server parsed that file and returned info corresponding to
structure declared in [`invoiceConfig.js`](routes/invoice/invoiceConfig.js).

## What is worth to see here

1. Study config: [`invoiceConfig.js`](routes/invoice/invoiceConfig.js)
2. Usage package in [`routes.js`](routes/invoice/routes.js)

## What later

1. Study documentation: [docs](./../../README.md)
2. Start using `xlsx-import` in your project
3. Ask a lot, report bugs and request for help: <https://github.com/Siemienik/xlsx-import/issues>
4. [Sponsor `xlsx-import` project](https://github.com/sponsors/Siemienik)

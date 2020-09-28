const stripe = require('stripe')("sk_test_51HWNyMFuNk3TIbYNdpcSxkGnOjoL7LV2qjpf4oybqqkmuAdcBl2kCJtdvkxk9n3XZ6k6Ric2DRY8bZ59cbyzPml600rMPtrMQf")
const { v4: uuidv4 } = require('uuid');

exports.makepayment = (req, res) => {
    const { products, token } = req.body
    console.log("PRODUCTS", products)

    let amount = 0
    // console.log(products)
    products.map((product) => {
        amount = amount + product.price
    })

    const idempotencyKey = uuidv4()

    return stripe.customers.create({
        email: token.email,
        source: token.id,
        
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping:{
                name: token.card.name,
                address: {
                    line1 : token.card.address_line1,
                    line2 : token.card.address_line2,
                    city : token.card.address_city,
                    country : token.card.address_country,
                }
            }
        }, { idempotencyKey })
            .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    })
    
}
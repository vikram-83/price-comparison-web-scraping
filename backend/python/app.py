import sys
import json
from scraper.amazon import get_amazon
from scraper.flipkart import get_flipkart
from scraper.meesho import get_meesho
from scraper.myntra import get_myntra

query = sys.argv[1] if len(sys.argv) > 1 else 'laptop'

stores = [
    *get_amazon(query),
    *get_flipkart(query),
    *get_meesho(query),
    *get_myntra(query)
]

prices = [product['price'] for product in stores]
lowest_price = min(prices) if prices else 0
for product in stores:
    product['lowestPrice'] = product['price'] == lowest_price
    product['priceTag'] = f"₹{product['price']:,}"
    product['bestDeal'] = product['price'] == lowest_price

print(json.dumps(stores))

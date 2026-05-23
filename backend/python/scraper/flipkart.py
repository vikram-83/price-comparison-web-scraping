import random

def get_flipkart(query):
    base = random.randint(11000, 50000)
    history = []
    for i in range(7):
        history.append({
            'date': f'2026-04-{18 + i}',
            'price': base + random.randint(-1700, 1300)
        })
    return [
        {
            'productId': f'flipkart-{query.replace(" ", "-").lower()}',
            'site': 'Flipkart',
            'name': query + ' (Flipkart)',
            'price': base,
            'link': 'https://flipkart.com',
            'image': '/assets/flipkart.svg',
            'rating': round(random.uniform(4.0, 4.7), 1),
            'reviewCount': random.randint(180, 950),
            'priceHistory': history,
            'discount': random.randint(8, 20),
            'description': 'Competitive pricing and quick shipping from Flipkart partners.'
        }
    ]

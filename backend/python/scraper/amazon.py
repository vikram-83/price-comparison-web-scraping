import random

def get_amazon(query):
    base = random.randint(12000, 52000)
    history = []
    for i in range(7):
        history.append({
            'date': f'2026-04-{18 + i}',
            'price': base + random.randint(-1800, 1400)
        })
    return [
        {
            'productId': f'amazon-{query.replace(" ", "-").lower()}',
            'site': 'Amazon',
            'name': query + ' (Amazon)',
            'price': base,
            'link': 'https://amazon.in',
            'image': '/assets/amazon.svg',
            'rating': round(random.uniform(4.2, 4.8), 1),
            'reviewCount': random.randint(200, 1200),
            'priceHistory': history,
            'discount': random.randint(10, 25),
            'description': 'Fast delivery, strong seller rating and best-seller pricing from Amazon.'
        }
    ]




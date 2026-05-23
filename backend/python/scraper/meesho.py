import random

def get_meesho(query):
    base = random.randint(11000, 46000)
    history = []
    for i in range(7):
        history.append({
            'date': f'2026-04-{18 + i}',
            'price': base + random.randint(-1500, 1200)
        })
    return [
        {
            'productId': f'meesho-{query.replace(" ", "-").lower()}',
            'site': 'Meesho',
            'name': query + ' (Meesho)',
            'price': base,
            'link': 'https://meesho.com',
            'image': '/assets/meesho.svg',
            'rating': round(random.uniform(4.0, 4.7), 1),
            'reviewCount': random.randint(140, 820),
            'priceHistory': history,
            'discount': random.randint(8, 18),
            'description': 'Affordable and reliable seller rating from Meesho.'
        }
    ]

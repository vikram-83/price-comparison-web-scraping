import random

def get_myntra(query):
    base = random.randint(12000, 52000)
    history = []
    for i in range(7):
        history.append({
            'date': f'2026-04-{18 + i}',
            'price': base + random.randint(-1200, 1700)
        })
    return [
        {
            'productId': f'myntra-{query.replace(" ", "-").lower()}',
            'site': 'Myntra',
            'name': query + ' (Myntra)',
            'price': base,
            'link': 'https://myntra.com',
            'image': '/assets/myntra.svg',
            'rating': round(random.uniform(4.1, 4.8), 1),
            'reviewCount': random.randint(180, 980),
            'priceHistory': history,
            'discount': random.randint(7, 15),
            'description': 'Trendy offers and fast delivery from Myntra sellers.'
        }
    ]

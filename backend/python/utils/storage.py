import json

def save_data(product, data):
    try:
        with open('../../database/prices.json', 'r') as f:
            existing = json.load(f)
    except:
        existing = []

    existing.append({
        "product": product,
        "data": data
    })

    with open('../../database/prices.json', 'w') as f:
        json.dump(existing, f, indent=4)
import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """Управление ценами: GET — получить список, POST — сохранить список (требует пароль)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT id, group_name, time_label, price, sort_order FROM {SCHEMA}.prices ORDER BY sort_order')
        rows = cur.fetchall()
        conn.close()
        data = [{'id': r[0], 'group_name': r[1], 'time_label': r[2], 'price': r[3], 'sort_order': r[4]} for r in rows]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

    if method == 'POST':
        headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
        password = headers.get('x-admin-password', '')
        if password != ADMIN_PASSWORD:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

        body = json.loads(event.get('body') or '{}')
        items = body.get('items', [])

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'DELETE FROM {SCHEMA}.prices')
        for i, item in enumerate(items):
            cur.execute(
                f"INSERT INTO {SCHEMA}.prices (group_name, time_label, price, sort_order) VALUES (%s, %s, %s, %s)",
                (item['group_name'], item['time_label'], item['price'], i)
            )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS, 'body': ''}

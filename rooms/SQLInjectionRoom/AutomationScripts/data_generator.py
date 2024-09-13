import sqlite3
import hashlib

# Create a new SQLite database or connect to an existing one
conn = sqlite3.connect("../user_db.sqlite")
cursor = conn.cursor()

# Create a table to store user information
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        role TEXT
    )
''')

# Sample test user data
test_users = [
    ("bobert.raumgartner@htlwildwest.at", "@mogGs1234", "teacher"),
    ("jlo.kracher@htlwildwest.at", "@moguS1234", "teacher"),
    ("susi.bachhofer@htlwildwest.at", "@mOgus1234", "teacher"),
    ("kerer.framework@htlwildwest.at", "@Mogus1234", "teacher"),
    ("kerer.net@htlwildwest.at", "@mogus1234!", "student"),
    ("kerer.core@htlwildwest.at", "@mogUS1234", "admin"),
    ("kermit.angarus@htlwildwest.at", "@moGus1234", "teacher"),
    ("zeter.pottele@htlwildwest.at", "Amogus1234", "student"),
    ("rickard.kurzer@htlwildwest.at", "Mamogus1234", "student"),
    ("leo.borek@htlwildwest.at", "password!", "admin"),
]


# Insert test user data into the database
for username, password, role in test_users:
    # Hash the password before storing it
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, hashed_password, role))


# Create the "homework" table
cursor.execute("""
CREATE TABLE IF NOT EXISTS homework (
    id INTEGER PRIMARY KEY,
    subject TEXT,
    description TEXT,
    due_date DATE
)
""")

# Sample data for homework entries
data = [
    ("Mathematik", "Do algebra exercises", "2023-11-15"),
    ("SEW", "Write a software design document", "2023-11-20"),
    ("DEUTSCH", "Read a German short story", "2023-11-10"),
]

# Insert the sample data into the table
cursor.executemany("INSERT INTO homework (subject, description, due_date) VALUES (?, ?, ?)", data)

# Commit the changes and close the database connection
conn.commit()
conn.close()

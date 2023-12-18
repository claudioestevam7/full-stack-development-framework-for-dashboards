import sqlite3

# Conectar ao banco de dados (se não existir, ele será criado)
conexao = sqlite3.connect('./database/data/evolucao.db')

# Criar um cursor para executar comandos SQL
cursor = conexao.cursor()

# Criar uma tabela (por exemplo, uma tabela de usuários)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS dados     (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dia INTEGER NOT NULL,
        valor REAL
    )
''')

# Inserir dados de exemplo na tabela
cursor.execute("INSERT INTO dados (dia, valor) VALUES (?, ?)", (2, 30))
cursor.execute("INSERT INTO dados (dia, valor) VALUES (?, ?)", (1, 25))

# Commit para salvar as alterações
conexao.commit()

# Fechar a conexão
conexao.close()

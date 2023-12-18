import sqlite3
import pandas as pd

# Conectar ao banco de dados
conexao = sqlite3.connect('./database/data/evolucao.db')

# Consulta SQL para obter todos os registros da tabela 'usuarios'
consulta_sql = "SELECT * FROM dados"

# Usando pandas para ler os dados diretamente do banco de dados para um DataFrame
df = pd.read_sql_query(consulta_sql, conexao)

# Fechar a conexão com o banco de dados
conexao.close()

# Exibir o DataFrame
print(df)
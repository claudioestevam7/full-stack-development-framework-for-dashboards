from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}







#### PARA EXECUTAR 
##      uvicorn minha_app:app --host 0.0.0.0 --port 8000
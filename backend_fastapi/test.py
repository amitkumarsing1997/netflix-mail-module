from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def get_data():
    print("hello amit")

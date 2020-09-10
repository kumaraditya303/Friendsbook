FROM node:14.10.0-buster-slim as buildnode
ENV NODE_ENV production
WORKDIR /code
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . /code
RUN npm test -- --watchAll=false
RUN npm run build

FROM python:3.8-slim-buster 
EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# Install pip requirements
ADD requirements.txt .
RUN python -m pip install -r requirements.txt --no-cache-dir

WORKDIR /app
ADD . /app
COPY --from=buildnode /code/build /app/build
RUN rm -rf public src package.json package-lock.json pytest.ini requirements.txt
RUN useradd appuser && chown -R appuser /app
USER appuser
CMD [ "python" ,"manage.py","runserver" ]


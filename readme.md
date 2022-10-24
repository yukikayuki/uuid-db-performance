# uuid-db-performance
MySQLのプライマリーキーにuuidを指定すると遅いと聞いたので試してみた

## setup
```shell
# up
docker compost up -d
# down
docker compose down
```

## MySQL
```shell
cd mysql
npm install
npm run migrate
npm run bench # uuid v4
npm run bench_b7 # uuid v7
```

## PostgreSQL
```shell
cd postgres
npm install
npm run migrate
npm run bench # uuid v4
```

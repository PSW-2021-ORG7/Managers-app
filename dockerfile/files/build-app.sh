HOSPITAL_API_URL=$1
INTEGRATION_API_URL=$2
PHARMACY_API_URL=$3

cd app || exit
export HOSPITAL_API_HOST=${HOSPITAL_API_URL}
export INTEGRATION_API_HOST=${INTEGRATION_API_URL}
export PHARMACY_API_HOST=${PHARMACY_API_URL}
envsubst < environment.ts.template > ./Frontend/src/environments/environment.prod.ts || exit
cd Frontend || exit
npm run build --prod && \
cd dist && \
mv "$(find . -maxdepth 1 -type d | tail -n 1)" /app     
echo "Compiling..."
tsc

echo "Coping file..."
copyfiles "src/**/*.{gql,graphql}" package.json jest.config.js yarn.lock build
cp -r .ebextensions build

echo "Zipping..."
cd build
zip -r ./package.zip .

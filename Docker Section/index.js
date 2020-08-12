/**
 * correr container: docker run --name <some-name-app> -d <image-name>
 * docker ps: ver los containers que tenemos corriendo
 * docker run --name some-mongo -p 27017:27017 -d <name> : mapear el puerto
 */

let counter = 0;
while(true)
{
    console.log(counter);
    counter++;
}
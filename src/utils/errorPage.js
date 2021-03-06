const errorMessage = (error) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://img.icons8.com/ios-glyphs/50/000000/chat.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/style.css">
    <title>Chat APP</title>
</head>

<body class="bg-light">
    <nav class="navbar navbar-light opacity-75 bg-dark me-md-0">
        <div class="container-fluid">
            <a href="/">
                <span class="navbar-brand text-white mb-0 h1">Chat APP</span>
            </a>
        </div>
    </nav>
    <div class="position-relative container-fluid mt-mb-1" style="max-height: 90vh; min-height: 50vh; height: 70vh;">
    <h1>${error}</h1>
    </div>
    <div class="container-fluid" style="padding: 0;">
        <footer class="py-3 my-4 opacity-75 bg-dark container-fluid mx-0" style="width: 100vw;">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="/" class="nav-link px-2 text-white">Home</a></li>
            </ul>
            <p class="text-center text-white">&copy; 2021 All rights Reserved</p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
        crossorigin="anonymous"></script>

</body>

</html>
    `
}

module.exports = errorMessage
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <section class="container">
        <form class="form" name="feedback" method="POST">
            <label class="field-wrap" for="">
                <span>
                    Username
                </span>
                <input class="field name" type="text" name="name">
            </label>
            <label class="field-wrap" for="">
                <span>
                    Email
                </span>
                <input class="field email error" type="text" name="email">
            </label>
            <label class="field-wrap" for="">
                <span>
                    Phone number
                </span>
                <input class="field tel" name="phoneNumber">

            </label>

            <div class="status">
                <p class="status__succes">Invalid email.</p>
                <p class="status__error">Invalid phone.</p>
            </div>
            <button class="button-submit" id="button-submit" type="submit">Send</button>
        </form>
    </section>

    <script src="app.js"></script>
</body>

</html>
<!-- Создать страницу с формой.
В форме должны быть следующие поля:- имя
- email
- телефон
Реализовать отправку этой формы при помощи AJAX.
Реализовать обработку AJAX запроса на php.

В обработчике нужно: провести валидацию
- email содержит @
- телефон
эти валидации также продублировать еще на клиенте (js).

На поле телефон, должна стоять маска, при нажатии на поле курсор должен ставиться на начало поля (слева)

Создать базу данных с полями id name email phone
Провести проверку есть ли в этой таблице элемент с заполненным именем емейлом и
телефоном, если есть и заявка уходила в период 5 минут, форму не отправлять!

При успешной проверке - форма должна скрываться, а пользователю должно выводиться сообщение об успешной отправки заявки.
При неудачной проверке - пользователю должна выводиться ошибка над формой. -->
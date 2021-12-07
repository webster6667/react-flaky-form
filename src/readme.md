💠 **combineValidatorsSettingsLayers**
👆🏽 Связка привязка дефолтных настроек формы от файла конфига


💠 **form/init**  
👆🏽 Прежде чем отрисовывать форму, происходит инит ее настроек

<br>
<br>


💠 **add-control-settings**  
👆🏽 Проходиться по каждому контролу

&emsp;&emsp; 🔹 add-required

&emsp;&emsp; 🔹 add-combined-validate-rules(settings)    
&emsp;&emsp;&emsp;&emsp; 👆 Накладываю на контрол сначала слой формы, сверху слой контрола  
&emsp;&emsp;&emsp;&emsp; 👆 Если валидатору указываем просто true - тянет настройки из формы,
&emsp;&emsp;&emsp;&emsp;  если описываем свои настройки, то они будут наложенны поверх настроек формы

&emsp;&emsp; 🔹 add-control-handlers(write, click, mask, ...)
&emsp;&emsp;&emsp;&emsp; 👆 Функцию, которая определяет каком обработчику отрабатывать для данного инпута


&emsp;&emsp; 🔹 is-control-lock-submitting
&emsp;&emsp;&emsp;&emsp; 👆 Проверка, блокирует ли этот контрол кнопку отправления


<br>
<br>

💠 **control-handler**  
👆🏽 Далее, после взаимодействия с инпутом, срабатывает навешанный handler

&emsp;&emsp; 🔹 beforeInput  
&emsp;&emsp;&emsp;&emsp; 👆 Можно навесить на все инпуты через форму, или отдельно через инпут

&emsp;&emsp; 🔹 liveInputHandler    
&emsp;&emsp;&emsp;&emsp; 🎯 Смотрит по параметрам какой из валидаторов приминить при взаимодействи с инпутом

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 👆 Можно указать свой кастомный валидатор

&emsp;&emsp;&emsp;&emsp; 🎯 Если валидатор вернул `isWriteInputEnable === true`, происходит запись в стейт

&emsp;&emsp;&emsp;&emsp; 🎯 Если была ошибка, срабатывает error

<br>
<br>

💠 **liveValidatorShowErrorHandler**    
👆🏽 Работает над вызовом обработчика ошибки 

&emsp;&emsp; 🔹 DefaultLiveErrorHandler

&emsp;&emsp;&emsp;&emsp;🎯 Если была ошибка, отобразит это в стейте контрола

&emsp;&emsp;&emsp;&emsp;🎯 Выведет указанную ошибку

&emsp;&emsp;&emsp;&emsp;🎯 Скроет если нужно

&emsp;&emsp;&emsp;&emsp;🎯 Может работать с таймаутами

<br>
<br>

💠 **is-control-lock-submitting** - Проверка на блокировку кнопки после скрытия, отображения ошибки?

<br>
<br>

💠 **form/submit** - Если кнопка для отправки разблокированна, можно сделать отправку

🎯 Происходит вызов before-submit-handler

🎯 Он выбирает какой из валидаторов запустить

🎯 Отображает ошибки если нужно

🎯 Если их нет, оправляет запрос, и отвечает хуками

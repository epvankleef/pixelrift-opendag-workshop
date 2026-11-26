@echo off
rem =========================================================
rem PIXELRIFT: zet de workshop terug na elke groep.
rem Kopieert de schone versie uit BRON over deze map heen.
rem Nieuwe bestanden van leerlingen (zoals shop.html) worden verwijderd.
rem De mappen .git en .vscode en dit script zelf blijven staan.
rem =========================================================

rem De schone kopie van de workshopmap. Staat die ergens anders? Pas dit pad aan.
set "BRON=C:\backup"

rem De map waar dit script staat (zonder \ aan het eind)
set "DOEL=%~dp0"
set "DOEL=%DOEL:~0,-1%"
if "%BRON:~-1%"=="\" set "BRON=%BRON:~0,-1%"

rem === Veiligheidschecks: klopt de bron? ===
if not exist "%BRON%\" goto :geenbron
if not exist "%BRON%\index.html" goto :geenworkshop
if not exist "%BRON%\js\game.js" goto :geenworkshop
if /i "%BRON%"=="%DOEL%" goto :zelfdemap

rem === Terugzetten ===
echo Workshop terugzetten vanuit %BRON% ...
robocopy "%BRON%" "%DOEL%" /MIR /XD .git .vscode /XF reset-workshop.bat /R:1 /W:1 /NFL /NDL /NJH /NJS /NP >nul
rem Robocopy: 0 t/m 7 = gelukt, 8 of hoger = fout
if %ERRORLEVEL% GEQ 8 goto :mislukt

echo.
echo Klaar! De workshop is teruggezet.
echo Tip: start in opencode een nieuwe sessie. Wil je ook het gekozen character
echo terugzetten? Wis dan in de browser de Local Storage: F12, Application, Clear.
goto :stop

:geenbron
echo FOUT: de map %BRON% bestaat niet. Er is niets teruggezet.
goto :stop

:geenworkshop
echo FOUT: %BRON% lijkt geen kopie van de workshop: index.html of js\game.js ontbreekt.
echo Er is niets teruggezet.
goto :stop

:zelfdemap
echo FOUT: de bron en deze map zijn hetzelfde. Er is niets teruggezet.
goto :stop

:mislukt
echo FOUT: het terugzetten is niet helemaal gelukt. Sluit open bestanden en probeer het opnieuw.
goto :stop

:stop
echo.
pause

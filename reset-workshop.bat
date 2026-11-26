@echo off
rem =========================================================
rem PIXELRIFT: zet de workshopmap klaar, of zet hem terug na een groep.
rem Draai dit script vanuit de schone baseline, bijvoorbeeld
rem C:\baseline\pixelrift-opendag-workshop\reset-workshop.bat
rem Het kopieert die map naar de workshopmap (DOEL).
rem Aangepaste bestanden komen terug, nieuwe bestanden van leerlingen
rem (zoals shop.html) worden verwijderd. De map .vscode blijft staan.
rem =========================================================

rem De map waarin de leerlingen werken. Wil je een andere map? Pas dit pad aan.
set "DOEL=C:\opendag"

rem De baseline: de map waar dit script staat (zonder \ aan het eind)
set "BRON=%~dp0"
set "BRON=%BRON:~0,-1%"
if "%DOEL:~-1%"=="\" set "DOEL=%DOEL:~0,-1%"

rem === Veiligheidschecks ===
if not exist "%BRON%\index.html" goto :geenworkshop
if not exist "%BRON%\js\game.js" goto :geenworkshop
if /i "%BRON%"=="%DOEL%" goto :zelfdemap
rem Bestaat de doelmap al? Dan moet het een workshopmap zijn, anders wissen we misschien iets anders.
if exist "%DOEL%\" if not exist "%DOEL%\index.html" goto :vreemddoel

rem === Kopieren ===
echo Workshop klaarzetten in %DOEL% ...
robocopy "%BRON%" "%DOEL%" /MIR /XD .vscode /R:1 /W:1 /NFL /NDL /NJH /NJS /NP >nul
rem Robocopy: 0 t/m 7 = gelukt, 8 of hoger = fout
if %ERRORLEVEL% GEQ 8 goto :mislukt

echo.
echo Klaar! De workshop staat schoon klaar in %DOEL%.
echo Tip: start in opencode een nieuwe sessie. Wil je ook het gekozen character
echo terugzetten? Wis dan in de browser de Local Storage: F12, Application, Clear.
goto :stop

:geenworkshop
echo FOUT: %BRON% lijkt geen workshopmap: index.html of js\game.js ontbreekt.
echo Er is niets veranderd.
goto :stop

:zelfdemap
echo FOUT: dit script staat in de workshopmap zelf. Er is niets veranderd.
echo Draai het script vanuit de baseline, bijvoorbeeld:
echo C:\baseline\pixelrift-opendag-workshop\reset-workshop.bat
goto :stop

:vreemddoel
echo FOUT: %DOEL% bestaat al, maar lijkt geen workshopmap (index.html ontbreekt).
echo Er is niets veranderd. Klopt het pad? Verwijder de map dan zelf en draai het script opnieuw.
goto :stop

:mislukt
echo FOUT: het kopieren is niet helemaal gelukt. Sluit open bestanden en probeer het opnieuw.
goto :stop

:stop
echo.
pause

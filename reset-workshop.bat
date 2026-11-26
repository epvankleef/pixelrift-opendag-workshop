@echo off
rem =========================================================
rem PIXELRIFT: zet de workshopmap klaar, of zet hem terug na een groep.
rem Draai dit script vanuit de schone baseline, bijvoorbeeld
rem C:\baseline\pixelrift-opendag-workshop\reset-workshop.bat
rem Het kopieert die map naar de workshopmap (DOEL).
rem Aangepaste bestanden komen terug, weggegooide bestanden ook, en
rem nieuwe bestanden van leerlingen (zoals shop.html) worden verwijderd.
rem Dit script zelf, HANDLEIDING.md en de map .vscode worden niet gekopieerd.
rem De eerste keer zet het script twee snelkoppelingen op het bureaublad:
rem reset-workshop (dit script) en opendag (de workshopmap).
rem =========================================================

rem De map waarin de leerlingen werken. Wil je een andere map? Pas dit pad aan.
rem Let op: alles wat in deze map staat, wordt gelijk gemaakt aan de baseline.
set "DOEL=C:\opendag"

rem De baseline: de map waar dit script staat (zonder \ aan het eind)
set "BRON=%~dp0"
set "BRON=%BRON:~0,-1%"
if "%DOEL:~-1%"=="\" set "DOEL=%DOEL:~0,-1%"

rem === Veiligheidschecks ===
if not exist "%BRON%\index.html" goto :geenworkshop
if not exist "%BRON%\js\game.js" goto :geenworkshop
if /i "%BRON%"=="%DOEL%" goto :zelfdemap

rem === Eerst even vragen of het echt de bedoeling is ===
echo Alles in %DOEL% wordt teruggezet. Het werk van de leerlingen gaat verloren.
set "ANTWOORD="
set /p "ANTWOORD=Weet je het zeker? Typ J voor ja of N voor nee en druk op Enter: "
if /i "%ANTWOORD%"=="J" goto :kopieren
if /i "%ANTWOORD%"=="JA" goto :kopieren
goto :geannuleerd

:kopieren
echo Workshop klaarzetten in %DOEL% ...
robocopy "%BRON%" "%DOEL%" /MIR /XD .vscode /XF reset-workshop.bat HANDLEIDING.md /R:1 /W:1 /NFL /NDL /NJH /NJS /NP >nul
rem Robocopy: 0 t/m 7 = gelukt, 8 of hoger = fout
if %ERRORLEVEL% GEQ 8 goto :mislukt
rem Oude kopieen van dit script en van de handleidingen horen niet in de workshopmap
if exist "%DOEL%\reset-workshop.bat" del /f /q "%DOEL%\reset-workshop.bat"
if exist "%DOEL%\HANDLEIDING.md" del /f /q "%DOEL%\HANDLEIDING.md"
if exist "%DOEL%\DOCENT.md" del /f /q "%DOEL%\DOCENT.md"
if exist "%DOEL%\BEGELEIDERS.md" del /f /q "%DOEL%\BEGELEIDERS.md"

rem === Snelkoppelingen op het bureaublad (alleen als ze er nog niet zijn) ===
rem reset-workshop wijst naar dit script, opendag naar de workshopmap.
powershell -NoProfile -Command "$d = [Environment]::GetFolderPath('Desktop'); $w = New-Object -ComObject WScript.Shell; $p = Join-Path $d 'reset-workshop.lnk'; if (-not (Test-Path $p)) { $s = $w.CreateShortcut($p); $s.TargetPath = '%~f0'; $s.WorkingDirectory = '%BRON%'; $s.Save(); Write-Host 'Er staat nu een snelkoppeling reset-workshop op het bureaublad.' }; $p = Join-Path $d 'opendag.lnk'; if (-not (Test-Path $p)) { $s = $w.CreateShortcut($p); $s.TargetPath = '%DOEL%'; $s.Save(); Write-Host 'Er staat nu een snelkoppeling opendag op het bureaublad.' }"

echo.
echo Klaar! De workshop staat schoon klaar in %DOEL%.
echo Tip: typ /new in opencode, dan begint de AI met een lege chat.
goto :stop

:geenworkshop
echo FOUT: %BRON% lijkt geen workshopmap: index.html of js\game.js ontbreekt.
echo Er is niets veranderd.
goto :stop

:zelfdemap
echo FOUT: de baseline en de workshopmap zijn dezelfde map. Er is niets veranderd.
echo Draai het script vanuit C:\baseline\pixelrift-opendag-workshop
goto :stop

:geannuleerd
echo Gestopt. Er is niets veranderd.
goto :stop

:mislukt
echo FOUT: het kopieren is niet helemaal gelukt. Sluit open bestanden en probeer het opnieuw.
goto :stop

:stop
echo.
pause

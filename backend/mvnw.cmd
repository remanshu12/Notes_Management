@echo off
REM Maven wrapper script for Windows

setlocal enabledelayedexpansion

REM Download Maven if not present
set MAVEN_HOME=%~dp0.mvn\maven
set MAVEN_VERSION=3.9.6

if not exist "%MAVEN_HOME%" (
    echo Downloading Maven %MAVEN_VERSION%...
    set MAVEN_URL=https://archive.apache.org/dist/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip
    set MAVEN_ZIP=%~dp0.mvn\apache-maven-%MAVEN_VERSION%-bin.zip
    
    mkdir "%~dp0.mvn" 2>nul
    
    powershell -Command "(New-Object System.Net.ServicePointManager).SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%MAVEN_URL%' -OutFile '%MAVEN_ZIP%'" || (
        echo Failed to download Maven
        exit /b 1
    )
    
    powershell -Command "Expand-Archive -Path '%MAVEN_ZIP%' -DestinationPath '%~dp0.mvn\' -Force"
    ren "%~dp0.mvn\apache-maven-%MAVEN_VERSION%" maven
)

REM Run Maven
"%MAVEN_HOME%\bin\mvn.bat" %*

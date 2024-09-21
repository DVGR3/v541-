// Ereignis, wenn Taste A gedrückt wird
input.onButtonPressed(Button.A, function () {
    if (!(startErlaubtA)) {
        // Steuerung starten
        startErlaubtA = true
        basic.showLeds(`
            . # # . .
            # . . # .
            # . . . #
            # . . # .
            . # # . .
            `)
        basic.pause(2000)
        basic.showLeds(`
            . # # . .
            . . . # .
            . . # . .
            . . . . .
            . . # . .
            `)
        basic.pause(2000)
        basic.showNumber(zahlNachricht)
    } else if (!(sendeModus)) {
        // Zahl verringern
        zahlNachricht += 0 - 1
        begrenzeZahl()
        basic.showNumber(zahlNachricht)
    } else {
        // Wertepaar verringern
        wertePaar += 0 - 1
        begrenzeWertePaar()
        basic.showNumber(wertePaar)
    }
})
// Funktion zum Senden der Nachricht
function sendeFunkNachricht () {
    switch (zahlNachricht) {
        case 1: nachricht = "Servus"; break;
        case 2: nachricht = "Grüß Gott"; break;
        case 3: nachricht = "wie geht's?"; break;
        case 4: nachricht = "Gut"; break;
        case 5: nachricht = "Schlecht"; break;
        case 6: nachricht = "Adee"; break;
        case 7: nachricht = "Tschau"; break;
        case 8: nachricht = "Langeweile"; break;
        case 9: nachricht = "Lächeln"; break;
        case 10: nachricht = "Traurig"; break;
        case 11: nachricht = "Wütend"; break;
        case 12: nachricht = "IceFuzzy"; break;
    }
radio.sendString("" + (nachricht))
}
// Funktion zur Begrenzung des Wertepaars auf 1-2
function begrenzeWertePaar () {
    if (wertePaar < 1) {
        wertePaar = 1
    } else if (wertePaar > 2) {
        wertePaar = 1
    }
}
// Ereignis, wenn A und B gleichzeitig gedrückt werden
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Yes)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    basic.pause(1600)
    if (startErlaubtA && !(sendeModus)) {
        // In den Wertepaar-Einstellmodus wechseln
        sendeModus = true
        basic.showNumber(wertePaar)
    } else if (startErlaubtA && sendeModus) {
        // Nachricht senden
        sendeFunkNachricht()
        control.reset()
    } else if (letzteNachrichtEmpfangen) {
        // Zeige empfangene Nachricht an
        basic.showString(empfangeneNachricht)
        control.reset()
    }
})
// Funktion zur Begrenzung der ZahlNachricht auf 1-12
function begrenzeZahl () {
    if (zahlNachricht < 1) {
        zahlNachricht = 12
    } else if (zahlNachricht > 12) {
        zahlNachricht = 1
    }
}
// Ereignis, wenn Taste B gedrückt wird
input.onButtonPressed(Button.B, function () {
    if (startErlaubtA && !(sendeModus)) {
        // Zahl erhöhen
        zahlNachricht += 1
        begrenzeZahl()
        basic.showNumber(zahlNachricht)
    } else if (startErlaubtA && sendeModus) {
        // Wertepaar erhöhen
        wertePaar += 1
        begrenzeWertePaar()
        basic.showNumber(wertePaar)
    } else if (letzteNachrichtEmpfangen) {
        // Pfeil anzeigen
        basic.showArrow(ArrowNames.South)
    }
})
// Empfangene Nachricht verarbeiten
radio.onReceivedValue(function (name, value) {
    empfangeneNachricht = name
    letzteNachrichtEmpfangen = true
    if (value == 2) {
        // Alarm für Wertepaar 2 aktivieren
        basic.showIcon(IconNames.Diamond)
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
let empfangeneNachricht = ""
let letzteNachrichtEmpfangen = false
let sendeModus = false
let startErlaubtA = false
let zahlNachricht = 0
let wertePaar = 0
let nachricht = ""
wertePaar = 1
zahlNachricht = 1
// Beim Start des Microbit
radio.setGroup(135)
basic.showLeds(`
    . . . . .
    # # . # #
    # # . # #
    . . . . .
    . . . . .
    `)
// Initialisierung
zahlNachricht = 1
wertePaar = 1

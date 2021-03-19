import RPi.GPIO as GPIO
import time

servoPIN = 4
enginePIN = 14

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)
GPIO.setup(enginePIN, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50) # GPIO 17 als PWM mit 50Hz
p.start(2.5) # Initialisierung
GPIO.output(enginePIN, 0)

def duty(angle):
   return angle / 18 + 2

def finish():
    p.stop()
    GPIO.output(enginePIN, 0)
    GPIO.cleanup()

try:
    p.ChangeDutyCycle(duty(87))
    time.sleep(1)
    finish()
        
except KeyboardInterrupt:
    finish()

# 87, 105, 105 , 125, 130
# 87, 71, 57, 53
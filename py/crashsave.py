import pigpio
import time

pi = pigpio.pi()

pi.set_mode(15, pigpio.OUTPUT)
pi.set_mode(18, pigpio.INPUT)

def receive():
    tStart = time.time()
    while True:
        if(pi.read(18) == 1):
            break
    
    delta = time.time() - tStart
    return delta *1000

def send():
    pi.write(15, 1)
    time.sleep(0.00001)
    pi.write(15, 0)

    tStart = time.time()
    while True:
        if(pi.read(18) == 1):
            break
        else:
            print("k")
    
    delta = time.time() - tStart
    print("Distance: ", delta)

while True:
    time.sleep(1)
    send()
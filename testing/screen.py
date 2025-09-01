from machine import Pin, SPI
from time import sleep_ms

USE_HORIZONTAL = 0
LCD_W          = 320
LCD_H          = 480

LCD_SPI_SCK    = 0
LCD_SPI_MOSI   = 0

LCD_CS         = 1   # Chip select pin
LCD_RS         = 14  # Register/Data select pin
LCD_RST        = 15  # Reset pin
LCD_BACKLIGHT  = 25  # Backlight control pin

SPI_SPEED = 50000000 # SPI speed 50MHz
spi = SPI(0, baudrate=SPI_SPEED)

def LCD_LED(i):
    print("backlight "+str(i))
    return
    if i == 1:
        Pin(LCD_BACKLIGHT, Pin.OUT).value(1)
    else:
        Pin(LCD_BACKLIGHT, Pin.OUT).value(0)

# GPIO set pin macros
def LCD_CS_SET():  Pin(LCD_CS, Pin.OUT).value(1)
def LCD_RS_SET():  Pin(LCD_RS, Pin.OUT).value(1)
def LCD_RST_SET(): Pin(LCD_RST, Pin.OUT).value(1)

# GPIO clear pin macros
def LCD_CS_CLR(): Pin(LCD_CS, Pin.OUT).value(0)
def LCD_RS_CLR(): Pin(LCD_RS, Pin.OUT).value(0)
def LCD_RST_CLR(): Pin(LCD_RST, Pin.OUT).value(0)

# Color definitions
WHITE      = 0xFFFF
BLACK      = 0x0000
BLUE       = 0x001F
BRED       = 0XF81F
GRED       = 0XFFE0
GBLUE      = 0X07FF
RED        = 0xF800
MAGENTA    = 0xF81F
GREEN      = 0x07E0
CYAN       = 0x7FFF
YELLOW     = 0xFFE0
BROWN      = 0XBC40
BRRED      = 0XFC07
GRAY       = 0X8430

POINT_COLOR = BLACK
BACK_COLOR  = GRAY

class _lcd_dev:
    def __init__(self):
        self.width = 0    # LCD width
        self.height = 0   # LCD height
        self.id = 0       # LCD ID
        self.dir = 0      # Display orientation: 0=portrait, 1=landscape
        self.wramcmd = 0  # Write GRAM command
        self.setxcmd = 0  # Set X coordinate command
        self.setycmd = 0  # Set Y coordinate command

lcddev = _lcd_dev()
DeviceCode = 0

def LCD_WR_REG(data):
   LCD_CS_CLR()
   LCD_RS_CLR()
   spi.write(bytearray([data]))  # Ensure data is within byte range
   LCD_CS_SET()

def LCD_WR_DATA(data):
   LCD_CS_CLR()
   LCD_RS_SET()
   spi.write(bytearray([data]))  # Ensure data is within byte range
   LCD_CS_SET()

def LCD_WriteReg(LCD_Reg, LCD_RegValue):
    LCD_WR_REG(LCD_Reg)
    LCD_WR_DATA(LCD_RegValue)

def LCD_WriteRAM_Prepare():
    LCD_WR_REG(lcddev.wramcmd)

def Lcd_WriteData_16Bit(Data):
    #18Bit
    LCD_WR_DATA((Data>>8)&0xF8)  # Convert to bytes
    LCD_WR_DATA((Data>>3)&0xFC)  # Convert to bytes
    LCD_WR_DATA(Data<<3)          # Convert to bytes

def LCD_DrawPoint(x,y):
    LCD_SetCursor(x,y)
    Lcd_WriteData_16Bit(POINT_COLOR)

def LCD_Clear(Color):
    i,m=0,0
    LCD_SetWindows(0,0,lcddev.width-1,lcddev.height-1)
    print("windows set")
    LCD_CS_CLR()
    LCD_RS_SET()
    print("filling pixel by pixel")
    for i in range(lcddev.height):
        for m in range(lcddev.width):
            Lcd_WriteData_16Bit(Color)
    print("wrote every pixel")
    LCD_CS_SET()

def LCD_RESET():
    print("reseting...")
    LCD_RST_CLR()
    sleep_ms(100)
    LCD_RST_SET()
    sleep_ms(50)
    print("reseted successfully!")

def LCD_Init():
    LCD_RESET() #LCD reset
    #************* ILI9488 Initialization**********#
    LCD_WR_REG(0xF7)
    LCD_WR_DATA(0xA9)
    LCD_WR_DATA(0x51)
    LCD_WR_DATA(0x2C)
    LCD_WR_DATA(0x82)
    LCD_WR_REG(0xC0)
    LCD_WR_DATA(0x11)
    LCD_WR_DATA(0x09)
    LCD_WR_REG(0xC1)
    LCD_WR_DATA(0x41)
    LCD_WR_REG(0XC5)
    LCD_WR_DATA(0x00)
    LCD_WR_DATA(0x0A)
    LCD_WR_DATA(0x80)
    LCD_WR_REG(0xB1)
    LCD_WR_DATA(0xB0)
    LCD_WR_DATA(0x11)
    LCD_WR_REG(0xB4)
    LCD_WR_DATA(0x02)
    LCD_WR_REG(0xB6)
    LCD_WR_DATA(0x02)
    LCD_WR_DATA(0x42)
    LCD_WR_REG(0xB7)
    LCD_WR_DATA(0xc6)
    LCD_WR_REG(0xBE)
    LCD_WR_DATA(0x00)
    LCD_WR_DATA(0x04)
    LCD_WR_REG(0xE9)
    LCD_WR_DATA(0x00)
    LCD_WR_REG(0x36)
    LCD_WR_DATA((1<<3)|(0<<7)|(1<<6)|(1<<5))
    LCD_WR_REG(0x3A)
    LCD_WR_DATA(0x66)
    LCD_WR_REG(0xE0)
    LCD_WR_DATA(0x00)
    LCD_WR_DATA(0x07)
    LCD_WR_DATA(0x10)
    LCD_WR_DATA(0x09)
    LCD_WR_DATA(0x17)
    LCD_WR_DATA(0x0B)
    LCD_WR_DATA(0x41)
    LCD_WR_DATA(0x89)
    LCD_WR_DATA(0x4B)
    LCD_WR_DATA(0x0A)
    LCD_WR_DATA(0x0C)
    LCD_WR_DATA(0x0E)
    LCD_WR_DATA(0x18)
    LCD_WR_DATA(0x1B)
    LCD_WR_DATA(0x0F)
    LCD_WR_REG(0XE1)
    LCD_WR_DATA(0x00)
    LCD_WR_DATA(0x17)
    LCD_WR_DATA(0x1A)
    LCD_WR_DATA(0x04)
    LCD_WR_DATA(0x0E)
    LCD_WR_DATA(0x06)
    LCD_WR_DATA(0x2F)
    LCD_WR_DATA(0x45)
    LCD_WR_DATA(0x43)
    LCD_WR_DATA(0x02)
    LCD_WR_DATA(0x0A)
    LCD_WR_DATA(0x09)
    LCD_WR_DATA(0x32)
    LCD_WR_DATA(0x36)
    LCD_WR_DATA(0x0F)
    LCD_WR_REG(0x11)
    sleep_ms(120)
    LCD_WR_REG(0x29)
    print("set direction...")
    LCD_direction(USE_HORIZONTAL)  # Set LCD display direction
    print("done")
    LCD_LED(1)
    print("clearing...")
    LCD_Clear(RED)  # Clear full screen to white
    print("done")
    
def LCD_SetWindows(xStar, yStar,xEnd,yEnd):
    LCD_WR_REG(lcddev.setxcmd)
    LCD_WR_DATA(xStar>>8)
    LCD_WR_DATA(0x00FF&xStar)
    LCD_WR_DATA(xEnd>>8)
    LCD_WR_DATA(0x00FF&xEnd)

    LCD_WR_REG(lcddev.setycmd)
    LCD_WR_DATA(yStar>>8)
    LCD_WR_DATA(0x00FF&yStar)
    LCD_WR_DATA(yEnd>>8)
    LCD_WR_DATA(0x00FF&yEnd)

    LCD_WriteRAM_Prepare()    # Start writing GRAM

def LCD_SetCursor(Xpos, Ypos):
    LCD_SetWindows(Xpos,Ypos,Xpos,Ypos)

def LCD_direction(direction):
    lcddev.setxcmd=0x2A
    lcddev.setycmd=0x2B
    lcddev.wramcmd=0x2C
    if direction==0:
        lcddev.width=LCD_W
        lcddev.height=LCD_H
        LCD_WriteReg(0x36,(1<<3)|(0<<6)|(0<<7))  # BGR==1,MY==0,MX==0,MV==0
    elif direction==1:
        lcddev.width=LCD_H
        lcddev.height=LCD_W
        LCD_WriteReg(0x36,(1<<3)|(0<<7)|(1<<6)|(1<<5))  # BGR==1,MY==1,MX==0,MV==1
    elif direction==2:
        lcddev.width=LCD_W
        lcddev.height=LCD_H
        LCD_WriteReg(0x36,(1<<3)|(1<<6)|(1<<7))  # BGR==1,MY==0,MX==0,MV==0
    elif direction==3:
        lcddev.width=LCD_H
        lcddev.height=LCD_W
        LCD_WriteReg(0x36,(1<<3)|(1<<7)|(1<<5))  # BGR==1,MY==1,MX==0,MV==1
    else:
        print("direction error")
        return

if __name__ == "__main__":
    Pin("LED", Pin.OUT).on()
    print("test d3m0n c1")

    LCD_Init()
    print("init done")
    LCD_Clear(MAGENTA)
    print("clear done")
    Pin("LED", Pin.OUT).off()


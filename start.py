import csv
import logging
import tkinter as tk
from tkinter import filedialog
import undetected_chromedriver as uc

import openpyxl

from selenium_manage import perform_selenium_actions


def get_vp_secret():
    file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
    if file_path:
        with open(file_path, 'r', encoding='utf-8') as csv_file:
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "parsed_data"
            ws.append(["Реєстраційний номер", "Номер ВП", "Категорія стягнення"])
            csv_reader = csv.reader(csv_file)
            driver = uc.Chrome()
            for row in csv_reader:
                user_number = row[0]
                print('data: ', user_number)
                perform_selenium_actions(user_number, driver, ws, wb)
            wb.save("parsed_data.xlsx")
            logging.info('xlsx saved')
            driver.close()


root = tk.Tk()
root.title("Document Parser")

file_button = tk.Button(root, text="Choose CSV File", command=get_vp_secret)
file_button.pack(pady=20)

root.mainloop()



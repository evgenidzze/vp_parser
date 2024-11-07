import csv
import os
import tkinter as tk
from tkinter import filedialog
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
import openpyxl
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options

from local_storage import LocalStorage
from selenium_manage import perform_selenium_actions, url



def get_vp_secret():
    file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
    if file_path:
        with open(file_path, 'r', encoding='utf-8') as csv_file:
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "parsed_data"
            ws.append(["Реєстраційний номер", "Номер ВП", "Категорія стягнення"])
            csv_reader = csv.reader(csv_file)
            extension_path = os.path.abspath('./CapSolver.Browser.Extension')
            chrome_options = Options()
            chrome_options.add_argument(f'--load-extension={extension_path}')

            driver = webdriver.Chrome(options=chrome_options)
            driver.maximize_window()
            driver.get(url)
            for row in csv_reader:
                storage = LocalStorage(driver)
                user_number = row[0]
                perform_selenium_actions(driver, user_number, ws, storage)

            wb.save("parsed_data.xlsx")


if __name__ == '__main__':
    root = tk.Tk()
    root.title("Document Parser")

    file_button = tk.Button(root, text="Choose CSV File", command=get_vp_secret)
    file_button.pack(pady=20)
    root.mainloop()


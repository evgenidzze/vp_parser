import csv
import time
import tkinter as tk
from tkinter import filedialog

import openpyxl
from botasaurus.browser import browser, Driver
from botasaurus_driver import Wait
from capsolver_extension_python import Capsolver

url = "https://erb.minjust.gov.ua/#/search-debtors"


@browser(wait_for_complete_page_load=True,
         extensions=[Capsolver(api_key="CAP-31B5C24C3C8E19C78D333CA2D0DCB4CB")],
         )
def start_browser(driver, data):
    csv_reader = data.get('csv_reader')
    ws = data.get('ws')
    wb = data.get('wb')
    for row in csv_reader:
        user_number = row[0]
        perform_selenium_actions(driver, user_number, ws)
    wb.save("parsed_data.xlsx")


def run():
    file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
    if file_path:
        with open(file_path, 'r', encoding='utf-8') as csv_file:
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "parsed_data"
            ws.append(["Реєстраційний номер", "Номер ВП", "Категорія стягнення"])
            csv_reader = csv.reader(csv_file)
            start_browser(data={'csv_reader': csv_reader, 'ws': ws, 'wb': wb})


def get_input(driver):
    inp_field = None
    count = 0
    while count != 3 and not inp_field:
        count += 1
        driver.get(url)
        print('waiting for visibility Номер ВП')
        try:
            inp_field = driver.wait_for_element('input[data-ng-model="vm.data.filter.IdentCode"]', wait=10)
        except:
            print('Not vp num on page. Next try...')
            driver.reload()
    else:
        return inp_field


def perform_selenium_actions(driver, user_number, ws):
    input_field = get_input(driver)
    if input_field:
        input_field.run_js("(el) => el.value = ''")
        input_field.type(user_number)
        time.sleep(2)
        click_search(driver)
        find_save_data(driver, ws, user_number)
    return


def find_save_data(driver, ws, user_number):
    table = driver.wait_for_element(
        "table[data-ng-show='!!vm.data.searchResults.isSuccess && !!vm.data.searchResults.results && !vm.data.searchResults.isOverflow']",
        wait=5)
    tbody = table.select('tbody')
    trs_list = tbody.select_all('tr.print-no-page-break.top-border')
    for tr in trs_list:
        td_vp_num = tr.select('td[data-title="Номер ВП"]')
        td_cat = tr.select('td[data-title="Категорія стягнення"]')
        ws.append([user_number, td_vp_num.text, td_cat.text])


def click_search(driver):
    search_btn = driver.wait_for_element("button[data-ng-click='vm.events.search()']", wait=Wait.LONG)
    print('click Шукати')
    success = click_until_success(driver, search_btn)


def click_until_success(driver, button):
    count = 0
    success = False
    button.click()
    while count <= 10 and not success:
        try:
            driver.wait_for_element('.btn--color-info.btn--state-successful', wait=5)
            success = True
            print('успіх')
        except Exception as er:
            time.sleep(5)
            print('не успіх')
            button.click()
    return success


if __name__ == '__main__':
    root = tk.Tk()
    root.title("Document Parser")

    file_button = tk.Button(root, text="Choose CSV File", command=run)
    file_button.pack(pady=20)
    root.mainloop()

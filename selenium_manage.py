from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import time

from utils import click_until_success, get_vp_field

url = "https://erb.minjust.gov.ua/#/search-debtors"


def human_like_wait(min_time=1.0, max_time=3.0):  # Allow float values
    time.sleep(random.uniform(min_time, max_time))


def perform_selenium_actions(user_number, driver: webdriver.Firefox, ws, wb):
    wait = WebDriverWait(driver, 10)

    driver.get(url)
    human_like_wait()  # Add a delay here

    num_field = get_vp_field(driver=driver, url=url)
    if num_field:
        num_field.clear()
        num_field.send_keys(user_number)
        human_like_wait()
        click_search(driver)

        table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,
                                                           "table[data-ng-show='!!vm.data.searchResults.isSuccess && !!vm.data.searchResults.results && !vm.data.searchResults.isOverflow']")))
        tbody = table.find_element(By.CSS_SELECTOR, 'tbody')
        trs_list = tbody.find_elements(By.CSS_SELECTOR, 'tr.print-no-page-break.top-border')
        for tr in trs_list:
            td_vp_num = tr.find_element(By.CSS_SELECTOR, 'td[data-title="Номер ВП"]')
            td_cat = tr.find_element(By.CSS_SELECTOR, 'td[data-title="Категорія стягнення"]')
            ws.append([user_number, td_vp_num.text, td_cat.text])


def click_search(driver):
    search_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[@class='btn btn--color-info' and @data-ng-click='vm.events.search()']"))
    )
    print('click Шукати')
    success = click_until_success(driver, search_btn)

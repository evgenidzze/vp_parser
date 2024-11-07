from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import time


url = "https://erb.minjust.gov.ua/#/search-debtors"


def human_like_wait(min_time=3.0, max_time=6.0):  # Allow float values
    time.sleep(random.uniform(min_time, max_time))


def move_mouse_to_element(driver, element):
    """Переміщує мишу до заданого елемента з випадковими рухами для імітації поведінки користувача."""
    action = ActionChains(driver)
    action.move_to_element(element).perform()

    # Імітація легких випадкових рухів миші навколо елемента
    for _ in range(random.randint(5, 10)):
        offset_x = random.randint(-5, 5)
        offset_y = random.randint(-5, 5)
        action.move_by_offset(offset_x, offset_y).perform()
        time.sleep(random.uniform(0.1, 0.3))  # короткі паузи для більш природного руху

    # Переміщення миші точно на елемент
    action.move_to_element(element).perform()


def perform_selenium_actions(driver, user_number, ws, storage):
    wait = WebDriverWait(driver, 10)

    from utils import get_input
    input_field = get_input(driver, url=url)
    if input_field:
        human_like_wait(1, 2)
        move_mouse_to_element(driver, input_field)
        input_field.clear()
        input_field.send_keys(user_number)

        human_like_wait(1, 2)

        click_search(driver, user_number, storage)
        find_save_data(wait, ws, user_number)
    return


def find_save_data(wait, ws, user_number):
    table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,
                                                       "table[data-ng-show='!!vm.data.searchResults.isSuccess && !!vm.data.searchResults.results && !vm.data.searchResults.isOverflow']")))
    tbody = table.find_element(By.CSS_SELECTOR, 'tbody')
    trs_list = tbody.find_elements(By.CSS_SELECTOR, 'tr.print-no-page-break.top-border')
    for tr in trs_list:
        td_vp_num = tr.find_element(By.CSS_SELECTOR, 'td[data-title="Номер ВП"]')
        td_cat = tr.find_element(By.CSS_SELECTOR, 'td[data-title="Категорія стягнення"]')
        ws.append([user_number, td_vp_num.text, td_cat.text])


def click_search(driver, user_number, storage):
    search_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[@class='btn btn--color-info' and @data-ng-click='vm.events.search()']"))
    )
    print('click Шукати')
    move_mouse_to_element(driver, search_btn)
    from utils import click_until_success
    success = click_until_success(driver, search_btn, user_number, storage)

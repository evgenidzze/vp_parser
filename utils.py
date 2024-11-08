import time
import webbrowser

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from seleniumwire import webdriver

from selenium_manage import url, human_like_wait, move_mouse_to_element
from selenium.webdriver.chrome.options import Options


def click_until_success(driver, button, user_number, storage):
    count = 0
    success = False
    time.sleep(10)
    button.click()
    while count <= 10 and not success:
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'btn--color-info.btn--state-successful')))
            success = True
            print('успіх')
        except Exception as er:
            time.sleep(7)
            print('не успіх')
            if count == 6:
                count += 1
                clear_google_data(driver, storage)
                input_field = get_input(driver, url=url)
                if input_field:
                    human_like_wait(1, 2)
                    move_mouse_to_element(driver, input_field)
                    input_field.clear()
                    input_field.send_keys(user_number)
                button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable(
                        (By.XPATH, "//button[@class='btn btn--color-info' and @data-ng-click='vm.events.search()']"))
                )
            button.click()
    return success


def clear_google_data(driver, storage):
    storage.clear()
    driver.delete_all_cookies()
    driver.get("https://www.google.com")
    driver.delete_all_cookies()
    storage.clear()
    driver.refresh()
    driver.get(url)


def get_input(driver, url):
    input_field = None
    count = 0
    while count != 3 and not input_field:
        count += 1
        driver.get(url)
        print('waiting for visibility Номер ВП')
        try:
            input_field = WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located(
                    (By.CSS_SELECTOR, 'input[data-ng-model="vm.data.filter.IdentCode"]'))
            )
        except:
            print('Not vp num on page. Next try...')
            driver.refresh()
    else:
        return input_field

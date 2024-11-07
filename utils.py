import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium_manage import url, human_like_wait, move_mouse_to_element


def click_until_success(driver, button, user_number, storage):
    count = 0
    success = False
    button.click()
    time.sleep(2)
    while count <= 5 and not success:
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'btn--color-info.btn--state-successful')))
            success = True
            print('успіх')
        except Exception as er:
            print('не успіх')
            time.sleep(10)
            if count == 3:
                driver.refresh()
                input_field = get_input(driver, url=url)
                if input_field:
                    human_like_wait(1, 2)
                    move_mouse_to_element(driver, input_field)
                    input_field.clear()
                    input_field.send_keys(user_number)
                    human_like_wait(1, 2)
                success = False
                count += 1
                button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable(
                        (By.XPATH, "//button[@class='btn btn--color-info' and @data-ng-click='vm.events.search()']"))
                )
            button.click()
    return success


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

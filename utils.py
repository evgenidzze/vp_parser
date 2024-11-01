from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

last_row = None


def other_document_if_exist(driver, text):
    try:
        element = WebDriverWait(driver, 5).until(
            EC.visibility_of_all_elements_located((By.XPATH,
                                                   f"//tr[@data-ng-repeat='item in vm.data.vpView.otherDocuments' and contains(., '{text}')]"))
        )
        return element[-1]
    except:
        return False


def click_until_success(driver, button):
    count = 0
    success = False
    button.click()
    while count <= 3 and not success:
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'btn--color-info.btn--state-successful')))
            success = True
        except Exception as er:
            success = False
            count += 1
            button.click()
    return success


def wait_pdf(driver, document):
    count = 0
    success_search = False
    pdf_frame = None
    while count != 3 and not success_search:
        try:
            pdf_frame = WebDriverWait(driver, 15).until(
                EC.visibility_of_element_located((By.ID, "pdfPlaceholder"))
            )
            success_search = True
        except Exception as er:
            if 'Файл не знайдено, вивантаження не можливе.' in driver.page_source:
                try:
                    button_back = WebDriverWait(driver, 20).until(
                        EC.visibility_of_element_located(
                            (By.XPATH, "//button[contains(text(), 'Назад')]"))
                    )
                    button_back.click()
                    doc_name_to_click = WebDriverWait(document, 10).until(
                        EC.element_to_be_clickable((By.CLASS_NAME, 'init-link'))
                    )
                    doc_name_to_click.click()
                except:
                    pass

            success_search = False
            count += 1
            print('pdf page loading')
    return success_search, pdf_frame


def get_vp_field(driver: webdriver.Firefox, url):
    vp_num = None
    count = 0
    while count != 3 and not vp_num:
        count += 1
        driver.get(url)
        print('waiting for visibility Номер ВП')
        try:
            vp_num = WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located(
                    (By.CSS_SELECTOR, 'input[data-ng-model="vm.data.filter.IdentCode"]'))
            )
        except:
            print('Not vp num on page. Next try...')
            driver.refresh()
    else:
        return vp_num


def reopen_driver(driver: webdriver.Firefox):
    driver.close()

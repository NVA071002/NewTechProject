import jwtDefaultConfig from "../@core/auth/jwt/jwtDefaultConfig"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0
const DefaultRoute = "/"
// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: "short", day: "numeric", year: "numeric" }) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */

export const getUserData = () => JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserData))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 // * @param {String} userRole Role of user
 */

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})
export const getHomeRouteForLoggedInUser = () => {
  return DefaultRoute
}
export const validateNumber = (value) => {
  if (!value || value.includes(".") || value.includes(",")) {
    return false
  }
  const matches = value.match(/^([0-9]\d*)(\.\d+)?$/)
  return matches?.length > 0 ? value : false
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const checkPassword = (value) => {
  if (pattern.test(value) === false) {
    return true
  }
  return false
}

export const urltoFile = (url, filename, mimeType) => {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType })
    })
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    if (!file) {
      alert("Please select an image")
    } else {
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const pat = /^(?=.*\d)(?=.*[a-z])[a-z\d]{6,}$/
export const checkUsername = (value) => {
  if (value.length < 6) {
    return false
  }
  if (pat.test(value) === false) {
    return false
  }
  return true
}

export const validateIDCard = (value) => {
  if (!value || value.includes(".") || value.includes(",")) {
    return false
  }
  const matches = value.match(/^[0-9a-zA-Z ]*$/)
  return matches?.length > 0 ? value : false
}

export const checkFullName = (value) => {
  const regex = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
  return value !== "" && value.match(regex) !== null
}

export const allowedFileTypes = [".jpg", ".jpeg", ".png", ".webp"]

export const ImageConfig = {
  pdf: "/icons/icon-file-pdf.png",
  docs: "/icons/icon-file-docs.png",
  doc: "/icons/icon-file-docs.png",
  docx: "/icons/icon-file-docs.png"
}

export const checkFileType = (data) => {
  return ImageConfig[data?.name?.split(".").pop()]
}

export const getImageFromLocal = (file) => {
  return URL.createObjectURL(file)
}

export const imageTypeRegex = /image\/(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)/gm

export function blobToURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      resolve(base64data)
    }
  })
}

export const checkShowOpinionReview = (totalStar) => (totalStar > 0 && totalStar < 4)
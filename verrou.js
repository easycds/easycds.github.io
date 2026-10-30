/* Easy Auto-École — déverrouillage des pages chiffrées, par compte personnel.
   Deux espaces, deux clés : « moniteurs » (outils, pédagogie, simulateur…) et « direction » (administratif, accès).
   Le contenu de chaque page est chiffré (AES-256-GCM). La clé de l'espace est rangée dans Firebase (acces/cle_<espace>) :
   seuls les comptes autorisés par les règles Firestore peuvent la lire (moniteurs de la liste acces/equipe, e-mail vérifié ;
   direction). Elle n'est gardée que le temps de l'onglet (sessionStorage). */
(function () {
  var SCRIPT = document.currentScript, ESPACE = (SCRIPT && SCRIPT.getAttribute('data-espace')) === 'direction' ? 'direction' : 'moniteurs';
  var NOM = ESPACE === 'direction' ? 'Espace direction' : 'Espace moniteurs';
  var STOCK = 'easy-cle-' + ESPACE, DUREE = 12 * 3600 * 1000;   // gardée seulement le temps de l'onglet (sessionStorage)
  try { localStorage.removeItem('easy-cle'); sessionStorage.removeItem('easy-cle'); } catch (e) {}   // anciennes versions (code commun)
  var b64 = function (s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
  var vers64 = function (u) { var s = ''; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); };
  var MARQUE = '<svg class="ea-logo" viewBox="0 0 380 192" role="img" aria-label="easy auto-école"><path fill-rule="evenodd" d="M23.0 191.7C22.9 191.5 22.2 191.2 21.6 191.0C19.5 190.5 17.0 188.9 15.5 187.2C15.2 186.8 14.8 186.3 14.6 186.2C14.1 185.6 13.1 183.6 12.5 182.0C12.0 180.7 11.9 179.8 11.9 177.2C11.9 175.5 12.0 173.7 12.2 173.2C13.7 168.5 16.1 165.6 20.1 163.7C21.5 163.0 24.9 162.3 26.4 162.3C29.5 162.2 33.4 163.5 35.5 165.2C37.9 167.1 38.8 168.4 40.4 172.1C40.9 173.3 41.3 177.9 41.0 178.6C40.7 179.0 40.0 179.0 30.5 179.0C24.9 179.0 20.1 179.1 19.9 179.2C19.0 179.5 19.9 182.1 21.5 183.7C24.4 186.6 29.1 186.5 32.1 183.5L33.4 182.2L36.8 182.2L40.2 182.2L40.2 182.9C40.2 183.9 38.4 186.8 36.8 188.2C35.3 189.7 33.7 190.6 31.9 191.0C31.3 191.2 30.6 191.5 30.5 191.7C30.3 191.9 29.4 192.0 26.8 192.0C24.1 192.0 23.2 191.9 23.0 191.7ZM57.8 191.5C57.5 191.2 57.0 191.0 56.7 191.0C55.2 191.0 51.4 188.3 49.7 186.0C46.5 181.5 46.0 174.8 48.6 170.1C50.6 166.2 53.9 163.7 58.4 162.7C60.9 162.1 62.6 162.1 65.2 162.7C69.3 163.7 72.3 165.8 74.5 169.3C74.8 169.8 75.0 170.3 75.0 170.5C75.0 170.7 75.2 171.2 75.4 171.6C75.6 172.1 75.8 172.7 75.7 173.0C75.6 173.6 75.6 173.6 72.0 173.6C68.7 173.6 68.4 173.6 68.2 173.1C66.1 169.5 62.2 168.2 58.6 169.9C55.9 171.2 54.5 173.7 54.5 177.1C54.5 180.5 55.9 183.0 58.5 184.3C59.8 185.0 60.1 185.0 62.0 184.9C63.8 184.9 64.3 184.7 65.4 184.1C66.1 183.6 67.0 182.8 67.6 181.9L68.6 180.5L72.1 180.6C75.6 180.6 75.6 180.6 75.7 181.2C75.8 181.5 75.6 182.2 75.4 182.6C75.2 183.1 75.0 183.6 75.0 183.8C75.0 184.0 74.8 184.4 74.5 184.8C74.2 185.1 74.0 185.5 74.0 185.6C74.0 186.0 72.1 188.1 70.9 189.0C69.8 189.8 67.6 190.8 65.8 191.4C65.5 191.5 65.2 191.6 65.2 191.8C65.2 191.9 63.8 192.0 61.8 192.0C58.8 192.0 58.3 191.9 57.8 191.5ZM92.8 191.8C92.8 191.6 92.5 191.5 90.2 190.6C85.9 189.1 82.5 184.6 81.6 179.5C81.3 177.3 81.3 176.9 81.6 174.7C82.2 171.5 83.5 168.9 85.6 166.8C88.0 164.4 89.9 163.3 93.2 162.6C95.6 162.1 97.0 162.1 99.5 162.7C104.9 164.0 108.3 167.1 110.2 172.3C110.8 173.9 110.9 174.5 110.9 177.0C110.9 180.1 110.5 181.6 109.3 184.2C107.8 187.2 104.2 190.2 101.1 191.0C100.5 191.2 99.9 191.5 99.7 191.7C99.5 191.9 98.6 192.0 96.1 192.0C94.3 192.0 92.8 191.9 92.8 191.8ZM143.0 191.7C142.9 191.5 142.2 191.2 141.6 191.0C139.5 190.5 137.9 189.5 136.0 187.5C133.5 184.9 132.3 182.6 132.0 179.3C131.3 172.2 134.3 166.3 140.1 163.7C141.6 163.0 145.1 162.2 146.6 162.2C148.3 162.2 151.7 163.0 153.2 163.8C156.5 165.3 158.9 168.1 160.3 171.9C160.9 173.5 161.3 178.2 161.0 178.7C160.7 178.9 158.5 179.0 150.4 179.0C144.8 179.0 140.0 179.1 139.8 179.2C139.5 179.4 139.5 179.6 139.8 180.7C140.6 183.8 143.2 185.7 146.7 185.7C148.9 185.8 150.6 185.0 152.1 183.5L153.4 182.2L156.9 182.3L160.4 182.4L160.3 183.0C160.3 183.3 160.1 183.8 159.9 184.1C159.8 184.4 159.4 185.1 159.1 185.7C158.0 187.6 155.2 189.9 153.0 190.6C152.4 190.9 151.4 191.3 150.9 191.5C150.0 191.9 149.3 192.0 146.6 192.0C144.1 192.0 143.2 191.9 143.0 191.7ZM118.0 190.9C117.6 190.5 117.6 153.9 118.1 153.5C118.3 153.3 119.5 153.3 121.7 153.3L124.9 153.4L124.9 172.1C125.0 186.9 124.9 190.9 124.7 191.0C124.2 191.4 118.4 191.3 118.0 190.9ZM99.0 184.3C101.4 183.2 102.8 181.3 103.3 178.7C104.0 174.3 101.9 170.7 97.9 169.6C96.5 169.2 96.0 169.2 95.0 169.5C92.3 170.1 90.7 171.3 89.6 173.6C88.7 175.5 88.7 178.7 89.6 180.6C91.3 184.2 95.5 185.9 99.0 184.3ZM32.7 173.4C33.2 173.0 33.1 172.6 32.3 171.5C31.3 170.1 30.2 169.3 28.9 168.9C25.7 167.9 22.6 168.9 20.7 171.5C20.0 172.6 19.8 173.4 20.3 173.6C20.5 173.7 23.3 173.7 26.5 173.7C30.8 173.7 32.5 173.7 32.7 173.4ZM152.6 173.6C153.2 173.4 153.1 172.6 152.3 171.5C150.4 168.9 147.7 167.9 144.3 168.8C142.2 169.4 139.1 173.1 140.3 173.6C140.8 173.8 152.1 173.8 152.6 173.6ZM22.8 158.8C21.4 157.6 21.2 157.2 21.4 156.8C21.8 156.1 27.1 151.0 27.5 151.0C27.7 151.0 28.7 151.8 29.7 152.8C31.7 154.8 31.8 155.3 30.6 156.0C30.3 156.2 28.9 157.2 27.5 158.3C26.1 159.4 24.8 160.2 24.7 160.2C24.5 160.2 23.6 159.6 22.8 158.8ZM233.1 149.7C222.7 149.0 215.4 147.8 205.9 145.1C203.5 144.4 199.1 143.0 197.8 142.4C197.4 142.2 197.0 142.0 196.9 142.0C196.8 142.0 196.3 141.8 195.9 141.6C195.5 141.5 193.8 140.7 192.2 140.0C190.6 139.3 188.5 138.4 187.5 137.9C186.6 137.4 185.7 137.0 185.6 137.0C185.2 137.0 180.8 134.3 179.7 133.3C176.7 130.6 175.6 127.0 176.7 123.4C177.2 121.9 178.7 118.9 179.6 117.4C182.8 112.3 185.0 109.8 187.3 108.6C188.3 108.1 188.8 108.0 190.7 108.0C193.4 108.0 194.2 108.3 198.5 110.3C201.3 111.7 203.1 112.5 205.1 113.4C213.6 117.2 223.8 119.5 235.1 120.0C241.4 120.4 251.1 120.1 255.5 119.4C260.5 118.6 261.4 118.5 263.4 118.1C266.7 117.5 271.3 116.3 273.7 115.5C274.4 115.2 275.2 115.0 275.5 115.0C275.7 115.0 276.3 114.8 276.9 114.5C277.4 114.2 278.0 114.0 278.2 114.0C278.3 114.0 279.0 113.8 279.7 113.5C281.5 112.7 282.2 112.3 284.1 111.5C286.8 110.4 292.5 107.4 293.8 106.5C294.2 106.2 294.5 106.0 294.6 106.0C294.7 106.0 296.9 104.5 299.5 102.7C304.1 99.5 310.3 93.3 313.4 88.9C313.7 88.5 314.3 87.6 314.8 86.9C315.9 85.2 318.5 80.7 318.5 80.3C318.5 80.0 317.8 78.7 317.0 77.4C316.5 76.6 314.7 73.5 313.9 72.2C313.7 71.7 313.3 71.0 313.0 70.6C312.7 70.2 312.1 69.1 311.5 68.1C310.9 67.2 310.3 66.0 310.0 65.6C309.7 65.2 309.3 64.5 309.1 64.1C308.4 62.9 306.5 59.7 306.0 59.0C305.8 58.6 304.9 57.1 304.1 55.7C303.3 54.3 302.4 52.8 302.1 52.3C301.8 51.8 301.1 50.6 300.5 49.6C299.9 48.7 299.2 47.5 298.9 47.0C298.6 46.5 297.7 44.9 296.9 43.5C296.1 42.1 295.2 40.7 295.0 40.3C294.7 39.9 294.1 38.8 293.5 37.9C292.9 36.9 292.3 35.8 292.0 35.3C291.7 34.9 291.3 34.1 291.0 33.7C290.7 33.2 290.1 32.1 289.5 31.1C288.9 30.2 288.3 29.0 288.0 28.6C287.7 28.2 287.3 27.5 287.1 27.1C286.9 26.7 286.2 25.5 285.6 24.5C282.3 19.2 281.2 16.5 281.2 14.4C281.2 12.9 282.2 10.4 283.6 8.8C284.8 7.4 287.7 5.1 289.8 3.9C292.6 2.2 295.7 0.8 296.5 0.8C296.6 0.7 296.8 0.6 296.9 0.4C297.0 0.1 297.6 -0.0 299.9 0.0C301.4 0.0 302.8 0.1 302.9 0.2C303.0 0.4 303.7 0.8 304.5 1.3C306.2 2.2 307.6 3.6 308.8 5.6C309.3 6.4 309.8 7.4 310.1 7.8C311.1 9.6 311.5 10.1 312.9 12.5C313.7 13.9 314.6 15.5 314.9 16.0C315.2 16.5 315.7 17.2 315.9 17.7C316.5 18.6 318.4 22.0 319.2 23.2C319.5 23.7 319.8 24.4 320.0 24.6C320.2 24.9 320.5 25.5 320.8 26.0C321.1 26.5 321.9 27.8 322.5 28.8C323.0 29.8 323.7 31.0 324.0 31.4C324.3 31.8 324.9 32.9 325.5 33.9C326.1 34.8 326.7 36.0 327.0 36.4C327.3 36.8 327.7 37.5 328.0 38.0C328.3 38.5 328.7 39.2 329.0 39.6C329.3 40.0 329.9 41.2 330.5 42.1C332.4 45.4 333.2 46.6 333.5 46.6C333.7 46.6 334.1 46.0 334.4 45.1C334.8 44.3 335.2 43.3 335.4 42.9C335.6 42.5 336.5 40.3 337.5 38.0C338.5 35.7 339.5 33.6 339.6 33.2C340.0 32.5 340.9 30.5 341.5 29.1C341.8 28.6 342.3 27.4 342.7 26.4C343.2 25.5 343.8 24.0 344.3 23.1C344.7 22.1 345.2 20.9 345.5 20.4C345.8 19.8 346.4 18.4 347.0 17.2C347.5 16.0 348.0 14.9 348.0 14.9C348.0 14.8 348.4 13.8 349.0 12.6C349.6 11.5 350.5 9.5 351.0 8.3C352.7 4.8 354.3 2.7 356.2 1.6C358.5 0.2 364.5 0.7 368.6 2.5C371.0 3.5 372.9 4.5 374.3 5.4C376.2 6.7 378.6 9.1 379.0 10.3C379.1 10.8 379.4 11.3 379.6 11.3C380.2 11.5 380.2 16.9 379.6 17.1C379.5 17.2 379.2 17.6 379.1 18.0C379.0 18.5 378.8 19.1 378.6 19.4C378.5 19.6 377.2 22.4 375.9 25.4C374.5 28.4 373.2 31.5 372.8 32.2C370.8 36.7 370.4 37.6 369.5 39.6C369.3 40.1 368.8 41.2 368.5 41.8C368.2 42.5 367.8 43.5 367.5 44.2C367.2 44.8 366.7 45.8 366.5 46.4C366.2 46.9 365.7 48.1 365.3 49.0C364.9 49.9 363.4 53.2 362.0 56.4C360.6 59.5 359.1 62.9 358.7 63.8C357.8 65.6 357.2 67.0 356.5 68.6C356.3 69.1 355.8 70.2 355.5 70.8C355.2 71.5 354.8 72.5 354.5 73.1C354.2 73.7 353.8 74.8 353.5 75.4C353.2 76.1 352.7 77.1 352.5 77.6C352.2 78.2 351.8 79.2 351.4 80.0C351.1 80.8 350.6 81.9 350.3 82.6C349.0 85.4 348.6 86.4 346.6 90.4C342.7 98.3 339.7 103.3 335.5 108.6C330.5 115.1 324.6 120.9 318.4 125.6C316.0 127.4 310.3 131.2 308.6 132.1C308.4 132.3 307.7 132.7 307.1 133.0C303.0 135.3 300.2 136.8 294.6 139.3C286.5 142.9 278.0 145.5 267.5 147.5C256.8 149.5 243.1 150.4 233.1 149.7ZM21.6 146.2C19.5 145.6 17.9 144.7 16.1 142.9C14.3 141.0 13.5 139.7 12.5 137.0C12.0 135.6 11.9 134.9 11.9 131.9C11.9 128.8 12.0 128.2 12.6 126.5C12.9 125.5 13.5 124.1 13.9 123.4C17.8 116.5 26.8 114.9 32.2 120.0C33.4 121.1 33.7 121.0 33.8 119.3L33.9 117.9L37.4 117.9L40.9 117.9L40.9 131.9L40.9 145.9L37.5 145.9C33.6 146.0 33.4 145.9 33.7 144.1C33.8 143.1 33.8 143.0 33.3 143.0C33.1 143.0 32.5 143.3 32.1 143.8C29.9 146.1 25.4 147.1 21.6 146.2ZM56.2 146.1C54.5 145.7 53.2 144.9 52.1 143.7C50.8 142.3 50.3 141.4 49.7 139.3C49.3 137.9 49.3 136.7 49.2 128.0C49.2 122.6 49.3 118.2 49.4 118.0C49.6 117.6 56.1 117.7 56.5 118.1C56.7 118.3 56.8 120.6 56.8 127.0C56.8 131.9 56.9 136.0 57.0 136.5C57.7 138.9 60.9 140.1 64.1 139.1C65.5 138.7 66.6 137.7 67.4 136.2C67.8 135.5 67.9 134.5 68.0 126.6L68.1 117.9L71.5 117.8C73.7 117.8 74.9 117.8 75.2 118.0C75.6 118.4 75.7 145.2 75.2 145.7C75.0 145.9 73.9 146.0 71.7 146.0C68.1 146.0 67.9 145.9 68.0 144.3C68.1 142.7 67.7 142.5 66.7 143.6C64.5 146.0 59.9 147.2 56.2 146.1ZM93.5 146.1C92.7 145.9 91.6 145.5 91.1 145.2C90.0 144.5 88.0 142.8 88.0 142.4C88.0 142.3 87.8 142.0 87.6 141.8C87.5 141.6 87.0 140.6 86.7 139.8C86.2 138.3 86.1 137.6 86.0 131.5L85.9 124.9L83.7 124.8C82.3 124.8 81.5 124.6 81.3 124.4C81.1 124.2 81.0 123.0 81.1 121.0L81.1 117.9L83.2 117.8C84.4 117.8 85.5 117.6 85.7 117.5C85.9 117.3 86.0 116.4 86.0 114.7C86.0 113.3 86.1 112.0 86.3 111.7C86.4 111.4 86.9 111.2 87.7 111.1C88.3 111.0 89.7 110.7 90.8 110.4C93.5 109.7 93.5 109.7 93.5 113.9C93.5 116.3 93.6 117.3 93.8 117.4C94.0 117.5 96.3 117.7 99.0 117.8L103.9 117.9L103.9 121.0C104.0 123.0 103.9 124.2 103.7 124.4C103.5 124.7 102.4 124.8 98.6 124.8C95.4 124.8 93.7 124.8 93.6 125.0C93.3 125.5 93.5 135.5 93.8 136.6C94.1 137.8 94.8 138.6 96.1 139.3C97.2 139.9 98.2 139.9 100.8 139.2C104.0 138.4 103.8 138.3 104.5 141.0C105.2 143.9 105.1 144.6 103.8 145.0C103.3 145.2 102.8 145.4 102.6 145.5C102.2 145.9 98.2 146.5 96.5 146.5C95.6 146.5 94.2 146.3 93.5 146.1ZM120.6 146.1C118.3 145.7 115.8 144.4 114.0 142.6C111.5 140.2 110.3 138.1 109.6 134.7C109.1 132.1 109.1 131.2 109.7 128.6C110.5 125.2 111.8 122.9 114.1 120.8C118.7 116.6 125.5 115.8 131.6 118.9C133.4 119.8 136.2 122.8 137.2 124.8C138.6 127.6 138.9 128.9 138.9 131.8C138.8 135.7 137.9 138.3 135.6 141.2C134.1 143.0 132.8 144.1 130.7 145.1C127.8 146.4 124.0 146.8 120.6 146.1ZM28.7 139.1C30.8 138.5 32.5 136.6 33.2 134.3C33.9 132.2 33.9 131.6 33.3 129.4C32.7 127.3 31.4 125.7 29.7 124.8C27.9 123.9 24.9 123.8 23.4 124.7C19.9 126.5 18.4 130.7 19.8 134.7C21.0 138.5 24.8 140.3 28.7 139.1ZM126.4 139.1C127.9 138.7 129.5 137.4 130.4 135.8C131.1 134.7 131.1 134.5 131.1 131.7L131.1 128.8L130.2 127.4C128.1 124.2 124.2 123.1 120.9 124.8C119.4 125.6 118.5 126.5 117.6 128.2C117.0 129.3 117.0 129.8 117.0 131.8C117.0 133.8 117.0 134.4 117.6 135.4C119.2 138.7 122.8 140.2 126.4 139.1ZM146.9 134.0C146.6 133.8 146.5 133.3 146.5 130.8C146.5 128.4 146.6 127.7 146.9 127.4C147.5 126.8 160.3 126.8 160.8 127.4C161.4 127.9 161.3 133.7 160.7 134.0C160.2 134.3 147.5 134.3 146.9 134.0ZM41.5 94.2C34.6 93.5 30.0 92.1 24.2 89.3C18.6 86.5 14.8 83.6 10.9 78.9C10.4 78.2 7.7 74.3 6.8 72.9C6.5 72.4 4.0 67.2 3.5 66.1C2.6 64.2 1.4 59.8 1.0 57.3C0.8 56.4 0.6 55.4 0.4 55.1C-0.2 54.2 -0.2 40.6 0.4 39.5C0.6 39.1 0.9 38.0 1.0 37.1C1.9 30.9 5.2 23.2 9.1 18.4C16.9 8.7 27.1 2.7 38.8 1.0C39.8 0.8 41.0 0.5 41.4 0.4C42.4 -0.2 55.5 -0.2 56.4 0.3C56.8 0.5 58.0 0.8 59.1 1.0C64.0 1.7 69.5 3.8 73.2 6.2C75.0 7.4 78.9 10.5 79.9 11.5C82.7 14.7 84.6 17.4 86.3 20.8C88.0 24.3 88.5 25.7 89.3 29.5C90.1 33.3 90.1 39.6 89.3 43.1C88.3 47.6 86.2 51.0 82.8 53.6C80.8 55.1 79.7 55.7 77.6 56.4L75.7 57.0L54.4 57.0C37.0 57.0 33.0 57.1 32.6 57.3C32.2 57.7 32.2 57.7 32.7 59.3C33.5 61.6 35.0 63.3 38.1 65.2C39.2 65.8 41.4 66.8 43.2 67.4C44.8 68.0 45.7 68.1 49.0 68.2C56.2 68.4 63.1 67.4 67.1 65.5C69.6 64.3 71.2 63.9 73.5 63.9C75.6 63.9 76.0 64.0 77.1 64.6C80.8 66.5 84.4 72.2 85.3 77.5C86.2 83.7 82.8 88.3 75.2 91.3C71.3 92.8 66.8 93.6 59.1 94.3C51.9 94.8 46.7 94.8 41.5 94.2ZM233.0 93.9C232.7 93.8 231.1 93.6 229.5 93.3C224.9 92.7 219.1 91.1 215.4 89.4C213.2 88.4 208.5 86.1 207.8 85.6C207.4 85.3 206.9 85.0 206.9 85.0C206.7 85.0 205.1 83.9 204.6 83.4C203.0 81.8 202.3 79.0 202.8 76.3C203.0 74.9 204.4 71.6 205.9 69.0C207.0 66.9 209.8 63.3 210.6 62.7C211.2 62.3 212.4 61.8 213.3 61.6C214.9 61.2 215.1 61.2 217.2 61.6C220.1 62.2 223.5 63.6 227.5 66.0C229.9 67.4 233.0 68.6 235.8 69.3C240.0 70.2 246.2 69.7 248.5 68.1C250.3 67.0 250.6 65.2 249.2 64.0C247.8 62.8 243.7 61.6 238.2 60.8C234.6 60.2 229.1 58.7 226.4 57.5C218.8 54.1 215.0 51.7 212.5 48.6C207.7 42.7 205.7 36.5 205.8 27.5C205.8 21.9 206.5 18.3 208.4 14.7C210.8 9.9 215.4 5.9 220.8 3.8C224.6 2.3 228.3 1.4 232.2 1.0C233.7 0.8 235.3 0.5 235.7 0.3C236.9 -0.1 247.1 -0.1 248.3 0.3C248.7 0.5 250.1 0.8 251.4 1.0C255.2 1.5 261.7 3.3 264.7 4.6C265.1 4.8 265.5 5.0 265.6 5.0C265.7 5.0 266.8 5.5 268.1 6.1C270.7 7.4 272.3 8.6 273.3 10.2C274.7 12.4 274.1 16.1 271.8 20.6C268.8 26.2 265.7 29.0 262.6 29.0C261.3 29.0 258.4 28.2 257.0 27.5C255.2 26.5 252.2 25.4 249.5 24.7C247.7 24.2 246.8 24.1 242.6 24.1C237.1 24.1 235.1 24.5 233.6 25.9C232.7 26.7 232.7 26.8 232.8 28.2C232.9 29.4 233.1 29.7 233.9 30.6C235.8 32.5 239.0 33.6 245.4 34.5C249.9 35.1 252.6 35.7 257.0 37.1C260.4 38.2 261.3 38.6 264.7 40.1C265.7 40.6 266.6 41.0 266.6 41.0C267.0 41.0 270.0 43.3 271.1 44.5C272.9 46.4 274.0 47.9 275.2 50.4C276.7 53.5 277.1 54.7 277.8 59.1C278.2 61.6 277.9 69.4 277.4 71.6C275.5 79.7 272.1 84.6 266.0 88.3C264.6 89.1 260.6 90.7 257.9 91.5C252.0 93.1 246.9 93.8 239.5 93.9C236.3 93.9 233.3 93.9 233.0 93.9ZM134.2 91.8C128.0 90.7 123.1 88.5 117.7 84.5C114.8 82.3 111.2 78.7 108.5 75.4C107.2 73.7 105.9 72.0 105.7 71.6C105.5 71.2 104.8 70.1 104.3 69.2C98.3 59.2 96.9 44.9 100.7 33.0C101.0 32.0 101.4 30.8 101.6 30.4C102.4 28.6 104.2 25.1 104.5 24.5C104.8 24.2 105.3 23.2 105.9 22.4C108.3 18.6 112.4 14.1 116.2 11.0C118.5 9.2 121.6 7.0 121.9 7.0C122.0 7.0 122.3 6.8 122.7 6.5C123.5 6.0 127.7 4.2 129.4 3.6C135.8 1.6 143.4 1.6 149.0 3.8C153.6 5.5 156.5 7.4 158.9 10.3C159.6 11.1 159.9 11.0 160.1 10.0C160.5 8.4 161.5 6.6 162.6 5.4C164.0 4.1 165.0 3.5 167.5 2.7C169.0 2.2 169.6 2.1 174.6 2.1C179.2 2.1 180.4 2.2 182.0 2.6C186.3 3.7 188.0 5.4 189.3 10.0L189.9 11.9L189.9 47.1L189.9 82.4L189.3 84.3C188.1 88.7 186.7 90.1 182.6 91.4C181.3 91.8 180.3 91.9 175.4 91.9C169.2 91.9 167.0 91.5 164.6 90.3C163.1 89.5 161.4 87.4 160.7 85.5C160.0 83.6 159.6 83.5 158.6 84.8C156.9 86.9 153.5 89.2 150.1 90.3C146.5 91.6 145.2 91.8 139.9 91.9C137.1 91.9 134.6 91.9 134.2 91.8ZM147.9 61.5C152.0 60.2 155.4 57.2 157.3 53.1C158.0 51.8 158.8 48.5 158.7 47.2C158.7 45.8 157.9 42.4 157.3 40.9C156.0 38.1 153.2 35.0 151.0 33.8C148.6 32.5 147.0 32.1 143.9 32.1C140.6 32.1 138.8 32.5 136.4 33.9C133.8 35.4 131.1 38.5 129.6 42.0C128.9 43.5 128.9 43.8 128.9 47.2L128.9 50.9L130.0 53.0C132.1 57.4 135.8 60.4 140.2 61.6C142.3 62.2 145.9 62.1 147.9 61.5ZM49.4 41.2L56.9 41.1L57.9 40.4C59.6 39.2 60.0 38.3 60.0 35.9C60.0 34.0 59.9 33.5 59.4 32.5C58.1 30.0 56.2 28.6 53.1 27.8C47.1 26.2 41.3 28.0 36.2 33.0C34.3 34.9 33.3 36.4 32.5 38.3C31.9 40.0 31.9 40.9 32.4 41.2C32.6 41.3 34.8 41.3 37.3 41.3C39.8 41.3 45.3 41.2 49.4 41.2Z"/></svg>' + '<svg class="ea-sourire" viewBox="0 0 508.9 161.9" aria-hidden="true"><path d="M6.77 32.98 L3.34 38.61 L1.68 42.68 L0.56 46.94 L0.00 51.30 L0.22 57.89 L1.08 62.20 L3.39 68.37 L5.57 72.19 L9.72 77.31 L14.78 81.53 L33.96 94.03 L56.03 107.06 L69.05 114.09 L78.28 118.77 L91.38 124.99 L100.71 129.12 L113.90 134.54 L123.31 138.10 L136.58 142.70 L146.08 145.68 L159.42 149.45 L169.00 151.84 L182.40 154.76 L192.05 156.55 L205.50 158.62 L215.19 159.80 L228.67 161.01 L237.96 161.55 L256.54 161.92 L275.55 161.31 L294.11 159.76 L303.37 158.62 L316.82 156.55 L335.27 152.90 L354.03 148.21 L372.29 142.70 L381.38 139.60 L394.62 134.68 L404.00 130.89 L417.48 124.99 L430.91 118.61 L444.26 111.74 L457.27 104.56 L470.51 96.74 L483.69 88.45 L494.08 81.53 L497.55 78.83 L500.64 75.70 L504.45 70.32 L507.15 64.31 L508.29 60.06 L508.86 55.70 L508.87 51.30 L508.31 46.94 L507.19 42.68 L505.53 38.61 L502.09 32.98 L486.05 11.81 L481.23 7.21 L475.61 3.64 L469.39 1.24 L462.83 0.09 L458.39 0.05 L453.97 0.59 L449.67 1.70 L445.54 3.36 L419.32 19.32 L408.29 25.49 L397.32 31.23 L386.35 36.55 L375.51 41.41 L364.73 45.84 L353.84 49.90 L343.36 53.42 L332.76 56.59 L315.02 61.01 L304.75 63.05 L294.31 64.75 L283.91 66.04 L273.53 66.95 L259.72 67.56 L245.91 67.48 L232.09 66.71 L221.49 65.66 L207.60 63.66 L193.85 61.01 L183.14 58.48 L169.23 54.58 L158.41 51.08 L144.31 45.90 L133.52 41.48 L122.68 36.62 L108.18 29.51 L93.49 21.57 L82.40 15.10 L67.19 5.55 L63.32 3.36 L57.07 1.08 L52.70 0.25 L48.26 0.00 L41.64 0.71 L35.28 2.71 L29.43 5.90 L25.93 8.64 L22.81 11.81Z"/></svg>';
  var css = 'html.easy-verrou body>*:not(#easy-acces){display:none!important}' +
    '#easy-acces{--bg:#f7f6f5;--surface:#fff;--text:#1c2430;--muted:#6b7280;--light:#9ca3af;--border:#ebe9e7;--easy:#ff3131;--shadow:0 1px 2px rgba(16,24,40,.04),0 4px 14px rgba(16,24,40,.06);' +
    'position:fixed;inset:0;z-index:2147483647;overflow:auto;background:var(--bg);color:var(--text);font-family:"DM Sans","Segoe UI",system-ui,sans-serif;-webkit-font-smoothing:antialiased;' +
    'display:flex;flex-direction:column;align-items:center;padding:max(20px,env(safe-area-inset-top)) 20px max(16px,env(safe-area-inset-bottom))}' +
    '#easy-acces.sombre{--bg:#0f1117;--surface:#1a1d27;--text:#e8eaf0;--muted:#8b92a8;--light:#5a6178;--border:#2a2f40;--shadow:0 1px 2px rgba(0,0,0,.3),0 4px 14px rgba(0,0,0,.35)}' +
    '#easy-acces *{box-sizing:border-box}' +
    '#easy-acces .ea-zone{flex:1;width:100%;max-width:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(24px,7vh,72px) 0 24px}' +
    '#easy-acces header{display:flex;flex-direction:column;align-items:center}' +
    '#easy-acces .ea-logo{display:block;width:clamp(140px,40vw,190px);height:auto;fill:var(--easy)}' +
    '#easy-acces .ea-sourire{display:block;width:clamp(130px,36vw,175px);height:auto;margin-top:14px;fill:var(--easy);clip-path:inset(0 100% 0 0);animation:ea-trace .7s cubic-bezier(.4,0,.2,1) .15s forwards}' +
    '@keyframes ea-trace{to{clip-path:inset(0 0 0 0)}}' +
    '#easy-acces form{width:100%;margin-top:clamp(28px,6vh,48px);text-align:center}' +
    '#easy-acces h1{margin:0;font:600 20px Fredoka,"DM Sans",sans-serif;letter-spacing:.01em}' +
    '#easy-acces p.ea-sous{margin:4px 0 22px;color:var(--muted);font-size:14.5px}' +
    '#easy-acces .pts{display:flex;justify-content:center;gap:12px;margin:0 0 26px}' +
    '#easy-acces .pts i{width:14px;height:14px;border-radius:50%;border:2px solid var(--border);background:var(--surface);transition:background .15s,border-color .15s,transform .15s}' +
    '#easy-acces .pts i.on{background:var(--easy);border-color:var(--easy);transform:scale(1.1)}' +
    '#easy-acces .clavier{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}' +
    '#easy-acces .clavier button{height:62px;border-radius:18px;border:1px solid var(--border);background:var(--surface);color:var(--text);box-shadow:var(--shadow);font:500 24px Fredoka,"DM Sans",sans-serif;cursor:pointer;transition:transform .1s,border-color .15s;-webkit-tap-highlight-color:transparent}' +
    '#easy-acces .clavier button:hover{border-color:var(--easy)}#easy-acces .clavier button:active{transform:scale(.96)}' +
    '#easy-acces .clavier button.vide{visibility:hidden}#easy-acces .clavier button.eff{background:transparent;box-shadow:none;border-color:transparent;color:var(--muted)}' +
    '#easy-acces .clavier button.eff svg{width:26px;height:26px}' +
    '#easy-acces input.ea-champ{width:100%;height:56px;border-radius:16px;border:1px solid var(--border);background:var(--surface);color:var(--text);box-shadow:var(--shadow);padding:0 16px;font:inherit;font-size:17px}' +
    '#easy-acces input.ea-champ:focus{outline:none;border-color:var(--easy)}' +
    '#easy-acces .ea-ok{margin-top:12px;width:100%;height:56px;border-radius:16px;border:0;background:linear-gradient(135deg,#ff4040 0%,#ff3131 55%,#ec1f1f 100%);color:#fff;font:600 17px Fredoka,"DM Sans",sans-serif;cursor:pointer}' +
    '#easy-acces .ea-ok[disabled]{opacity:.6}#easy-acces label{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;font-size:14px;color:var(--muted)}' +
    '#easy-acces .err{color:#e01f1f;font-weight:600;min-height:20px;margin:16px 0 0;font-size:14px}#easy-acces.sombre .err{color:#ff6b6b}' +
    '#easy-acces .ea-pied{font-size:12px;color:var(--light);text-align:center;padding-top:8px}#easy-acces .ea-pied a{color:inherit}' +
    '#easy-acces .secoue{animation:easy-secoue .35s}@keyframes easy-secoue{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}' +
    '#easy-acces .ea-champs{display:flex;flex-direction:column;gap:10px;text-align:left}#easy-acces .ea-champs span{display:block;font-size:13.5px;font-weight:600;margin:0 0 5px 4px}' +
    '#easy-acces .ea-liens{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:10px}' +
    '#easy-acces .ea-lien{background:none;border:0;color:var(--muted);font:inherit;font-size:14px;font-weight:600;padding:10px 6px;min-height:44px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}' +
    '#easy-acces .ea-lien:hover{color:var(--text)}#easy-acces .ea-info{margin:0 0 18px;color:var(--muted);font-size:15px;line-height:1.5}#easy-acces .ea-info b{color:var(--text)}' +
    '#easy-acces .ok{color:#1e7f45}#easy-acces.sombre .ok{color:#5fd08a}' +
    '@media (prefers-reduced-motion:reduce){#easy-acces .ea-sourire{animation:none;clip-path:none}#easy-acces .secoue{animation:none}}';
  function cadre(contenu) {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var pol = document.createElement('link'); pol.rel = 'stylesheet'; pol.href = '/fonts/polices.css'; document.head.appendChild(pol);
    document.documentElement.classList.add('easy-verrou');
    var d = document.createElement('div'); d.id = 'easy-acces'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', NOM);
    try { if (localStorage.getItem('easy-hub-theme') === 'dark') d.classList.add('sombre'); } catch (e) {}
    d.innerHTML = '<div class="ea-zone"><header>' + MARQUE + '</header>' + contenu + '</div><p class="ea-pied">Easy Auto-École · <a href="/mentions-legales.html">Mentions légales</a></p>';
    document.body.appendChild(d); return d;
  }
  function cleStockee() {
    try { var v = JSON.parse(sessionStorage.getItem(STOCK) || 'null'); if (v && v.k && Date.now() - v.t < DUREE) return v.k; } catch (e) {}
    return null;
  }
  function garder(k) { try { sessionStorage.setItem(STOCK, JSON.stringify({ k: k, t: Date.now() })); } catch (e) {} }
  function importer(k64) { return crypto.subtle.importKey('raw', b64(k64), 'AES-GCM', false, ['decrypt']); }

  async function ouvrir(k64) {
    var el = document.getElementById('easy-chiffre'); if (!el) return false;
    var d = b64(el.textContent.trim()), cle = await importer(k64);
    var brut = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: d.slice(0, 12) }, cle, d.slice(12));
    var html = await new Response(new Blob([brut]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    if (charge) { try { delete window.firebase; } catch (e) { window.firebase = undefined; } }   // la page recharge sa propre copie
    document.open(); document.write(html); document.close();
    return true;
  }

  /* ---------- Firebase : connexion (SDK) et lecture de la clé (API REST) ---------- */
  var CONF = { apiKey: 'AIzaSyBTlHPr02V0yTyyksUdQJhMgwwMBhns_9E', authDomain: 'easy-cds.firebaseapp.com', projectId: 'easy-cds' };
  var SDK = 'https://www.gstatic.com/firebasejs/10.12.0/';
  var DOCS = 'https://firestore.googleapis.com/v1/projects/easy-cds/databases/(default)/documents/acces/';
  var charge = false, authP = null;
  function script(src) { return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); }); }
  function auth() {
    if (!authP) authP = (window.firebase && window.firebase.auth ? Promise.resolve() :
      script(SDK + 'firebase-app-compat.js').then(function () { return script(SDK + 'firebase-auth-compat.js'); }).then(function () { charge = true; }))
      .then(function () { var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(CONF); return firebase.auth(app); });
    return authP;
  }
  function etat(a) { return new Promise(function (ok) { var stop = a.onAuthStateChanged(function (u) { stop(); ok(u); }); }); }
  async function lireCle(u, nom) {
    var r = await fetch(DOCS + nom, { headers: { Authorization: 'Bearer ' + (await u.getIdToken()) }, cache: 'no-store' });
    if (r.status === 404) return null;
    if (r.status === 403 || r.status === 401) throw { code: 'refus' };
    if (!r.ok) throw { code: 'reseau' };
    var j = await r.json(); return (j.fields && j.fields.k && j.fields.k.stringValue) || null;
  }
  async function ecrireCle(u, nom, k) {
    var r = await fetch(DOCS + nom, { method: 'PATCH', headers: { Authorization: 'Bearer ' + (await u.getIdToken()), 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { k: { stringValue: k } } }) });
    if (!r.ok) throw { code: r.status === 403 ? 'refus' : 'reseau' };
  }
  async function ecrireEquipe(u, liste) {   // liste de départ des moniteurs, seulement si elle n'existe pas encore
    var t = await u.getIdToken(), r = await fetch(DOCS + 'equipe', { headers: { Authorization: 'Bearer ' + t }, cache: 'no-store' });
    if (r.status !== 404) return;
    await fetch(DOCS + 'equipe', { method: 'PATCH', headers: { Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { moniteurs: { arrayValue: { values: liste.map(function (m) { return { stringValue: m }; }) } }, maj: { integerValue: String(Date.now()) } } }) });
  }
  function msgErreur(e) {
    var c = (e && e.code) || '';
    if (/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c)) return 'E-mail ou mot de passe incorrect';
    if (/too-many-requests/.test(c)) return 'Trop d’essais : réessaie dans quelques minutes';
    if (/email-already-in-use/.test(c)) return 'Ce compte existe déjà : connecte-toi avec ton mot de passe';
    if (/weak-password/.test(c)) return 'Mot de passe trop court (8 caractères minimum)';
    if (/invalid-email/.test(c)) return 'E-mail invalide';
    if (/network|reseau/.test(c) || navigator.onLine === false) return 'Pas de connexion internet';
    return 'Ça n’a pas marché, réessaie';
  }
  function echap(t) { return String(t || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Écrans ---------- */
  var ecran = null;
  function afficher(html) {
    if (ecran) ecran.remove();
    ecran = cadre(html);
    var f = ecran.querySelector('form'); if (f) { var c = f.querySelector('input:not([hidden])'); if (c) setTimeout(function () { c.focus(); }, 50); }
    return ecran;
  }
  function occuper(f, oui, texte) { var b = f.querySelector('.ea-ok'); if (!b) return; if (!b.dataset.t) b.dataset.t = b.textContent; b.disabled = oui; b.textContent = oui ? texte : b.dataset.t; }
  function erreur(f, t) { var e = f.querySelector('.err'); e.classList.remove('ok'); e.textContent = t; f.classList.remove('secoue'); void f.offsetWidth; f.classList.add('secoue'); }
  function champ(id, nom, type, auto) { return '<label class="ea-ch" style="display:block;margin:0"><span>' + nom + '</span><input class="ea-champ" id="' + id + '" type="' + type + '" autocomplete="' + auto + '" required></label>'; }

  function connexion(message) {
    var d = afficher('<form novalidate><h1>' + NOM + '</h1><p class="ea-sous">Connecte-toi avec ton compte</p><div class="ea-champs">' +
      champ('ea-mail', 'E-mail', 'email', 'username') + champ('ea-mdp', 'Mot de passe', 'password', 'current-password') +
      '</div><button class="ea-ok" type="submit">Se connecter</button><div class="err" aria-live="polite"></div>' +
      '<div class="ea-liens"><button type="button" class="ea-lien" data-a="creer">Première connexion ? Crée ton mot de passe</button>' +
      '<button type="button" class="ea-lien" data-a="oubli">Mot de passe oublié ?</button></div></form>');
    var f = d.querySelector('form'), mail = f.querySelector('#ea-mail'), mdp = f.querySelector('#ea-mdp');
    if (message) f.querySelector('.err').textContent = message;
    f.querySelector('[data-a=creer]').onclick = function () { creation(mail.value.trim()); };
    f.querySelector('[data-a=oubli]').onclick = async function () {
      if (!mail.value.trim()) { erreur(f, 'Tape d’abord ton e-mail au-dessus'); mail.focus(); return; }
      try { var a = await auth(); await a.sendPasswordResetEmail(mail.value.trim()); var e = f.querySelector('.err'); e.textContent = 'E-mail envoyé : regarde ta boîte (et les spams)'; e.classList.add('ok'); }
      catch (x) { erreur(f, msgErreur(x)); }
    };
    f.onsubmit = async function (e) {
      e.preventDefault();
      if (!mail.value.trim() || !mdp.value) { erreur(f, 'Remplis ton e-mail et ton mot de passe'); return; }
      occuper(f, true, 'Connexion…');
      try { var a = await auth(); var r = await a.signInWithEmailAndPassword(mail.value.trim(), mdp.value); await avecCompte(r.user); }
      catch (x) { occuper(f, false); erreur(f, msgErreur(x)); }
    };
  }

  function creation(mailInitial) {
    var d = afficher('<form novalidate><h1>Première connexion</h1><p class="ea-sous">Utilise l’e-mail que tu as donné à la direction</p><div class="ea-champs">' +
      champ('ea-mail', 'E-mail', 'email', 'username') + champ('ea-mdp', 'Choisis un mot de passe (8 caractères mini)', 'password', 'new-password') +
      champ('ea-mdp2', 'Retape-le', 'password', 'new-password') +
      '</div><button class="ea-ok" type="submit">Créer mon compte</button><div class="err" aria-live="polite"></div>' +
      '<div class="ea-liens"><button type="button" class="ea-lien" data-a="retour">J’ai déjà un compte</button></div></form>');
    var f = d.querySelector('form'), mail = f.querySelector('#ea-mail'), mdp = f.querySelector('#ea-mdp'), mdp2 = f.querySelector('#ea-mdp2');
    mail.value = mailInitial || '';
    f.querySelector('[data-a=retour]').onclick = function () { connexion(''); };
    f.onsubmit = async function (e) {
      e.preventDefault();
      if (!mail.value.trim()) { erreur(f, 'Tape ton e-mail'); return; }
      if (mdp.value.length < 8) { erreur(f, 'Mot de passe trop court (8 caractères minimum)'); return; }
      if (mdp.value !== mdp2.value) { erreur(f, 'Les deux mots de passe ne sont pas pareils'); return; }
      occuper(f, true, 'Création…');
      try { var a = await auth(); var r = await a.createUserWithEmailAndPassword(mail.value.trim(), mdp.value); await r.user.sendEmailVerification(); verification(r.user); }
      catch (x) { occuper(f, false); erreur(f, msgErreur(x)); }
    };
  }

  function verification(u) {
    var d = afficher('<form><h1>Vérifie ton e-mail</h1><p class="ea-info">On t’a envoyé un e-mail à <b>' + echap(u.email) + '</b>.<br>Clique sur le lien dedans (regarde aussi les spams), puis reviens ici.</p>' +
      '<button class="ea-ok" type="submit">C’est fait</button><div class="err" aria-live="polite"></div>' +
      '<div class="ea-liens"><button type="button" class="ea-lien" data-a="renvoi">Renvoyer l’e-mail</button><button type="button" class="ea-lien" data-a="autre">Changer de compte</button></div></form>');
    var f = d.querySelector('form');
    f.querySelector('[data-a=renvoi]').onclick = async function () { try { await u.sendEmailVerification(); var e = f.querySelector('.err'); e.textContent = 'E-mail renvoyé'; e.classList.add('ok'); } catch (x) { erreur(f, msgErreur(x)); } };
    f.querySelector('[data-a=autre]').onclick = sortir;
    f.onsubmit = async function (e) {
      e.preventDefault(); occuper(f, true, 'Vérification…');
      try { await u.reload(); if (!u.emailVerified) { occuper(f, false); erreur(f, 'Pas encore validé : clique bien sur le lien de l’e-mail'); return; } await u.getIdToken(true); await avecCompte(u); }
      catch (x) { occuper(f, false); erreur(f, msgErreur(x)); }
    };
  }

  function refus(u) {
    var t = ESPACE === 'direction' ? 'Cet espace est réservé à la direction.' : 'Ton compte n’est pas encore dans la liste des moniteurs. Demande à la direction de t’ajouter, puis réessaie.';
    var d = afficher('<form><h1>Accès réservé</h1><p class="ea-info">' + t + '<br><br>Compte : <b>' + echap(u.email) + '</b></p>' +
      '<button class="ea-ok" type="submit">Réessayer</button><div class="err" aria-live="polite"></div>' +
      '<div class="ea-liens">' + (ESPACE === 'direction' ? '<a class="ea-lien" href="/outils/">Aller à l’espace moniteurs</a>' : '') + '<button type="button" class="ea-lien" data-a="autre">Changer de compte</button></div></form>');
    var f = d.querySelector('form');
    f.querySelector('[data-a=autre]').onclick = sortir;
    f.onsubmit = async function (e) { e.preventDefault(); occuper(f, true, 'Vérification…'); try { await avecCompte(u); } catch (x) { occuper(f, false); erreur(f, msgErreur(x)); } };
  }

  // Première mise en route : la direction colle le code d'installation, qui ouvre /installation.json
  // et range les deux clés dans Firebase. Ensuite ce fichier est retiré du site.
  function installation(u) {
    var d = afficher('<form novalidate><h1>Mise en route</h1><p class="ea-info">Les espaces ne sont pas encore installés. Réservé à la direction : colle le <b>code d’installation</b>.</p><div class="ea-champs">' +
      champ('ea-code', 'Code d’installation', 'text', 'off') + '</div><button class="ea-ok" type="submit">Installer</button><div class="err" aria-live="polite"></div>' +
      '<div class="ea-liens"><button type="button" class="ea-lien" data-a="autre">Changer de compte</button></div></form>');
    var f = d.querySelector('form'), code = f.querySelector('#ea-code');
    f.querySelector('[data-a=autre]').onclick = sortir;
    f.onsubmit = async function (e) {
      e.preventDefault(); occuper(f, true, 'Installation…');
      try {
        var r = await fetch('/installation.json', { cache: 'no-store' }); if (!r.ok) throw { code: 'absent' };
        var c = await r.json();
        var base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code.value.replace(/[\s-]+/g, '').toUpperCase()), 'PBKDF2', false, ['deriveKey']);
        var kek = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(c.sel), iterations: c.tours, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        var cles;
        try { cles = JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(c.iv) }, kek, b64(c.donnees)))); }
        catch (x) { throw { code: 'code' }; }
        await ecrireCle(u, 'cle_moniteurs', cles.moniteurs); await ecrireCle(u, 'cle_direction', cles.direction);
        if (cles.equipe && cles.equipe.length) await ecrireEquipe(u, cles.equipe);
        await avecCompte(u);
      } catch (x) {
        occuper(f, false);
        erreur(f, x.code === 'code' ? 'Code d’installation incorrect' : x.code === 'refus' ? 'Ce compte n’a pas le droit d’installer (règles Firebase)' : x.code === 'absent' ? 'Installation déjà faite ou indisponible' : msgErreur(x));
      }
    };
  }

  async function avecCompte(u) {
    var k;
    try { k = await lireCle(u, 'cle_' + ESPACE); }
    catch (x) {
      if (x.code !== 'refus') throw x;
      if (!u.emailVerified && ESPACE === 'moniteurs') { try { await u.sendEmailVerification(); } catch (e) {} verification(u); return; }
      refus(u); return;
    }
    if (!k) { installation(u); return; }
    garder(k);
    if (ESPACE === 'direction') try { localStorage.setItem('easy-est-direction', '1'); } catch (e) {}   // simple raccourci d'affichage, pas un droit
    if (await ouvrir(k)) return;
    if (ecran) ecran.remove(); document.documentElement.classList.remove('easy-verrou');
  }

  async function sortir() {
    try { sessionStorage.removeItem('easy-cle-moniteurs'); sessionStorage.removeItem('easy-cle-direction'); localStorage.removeItem('easy-est-direction'); } catch (e) {}
    try { var a = await auth(); await a.signOut(); } catch (e) {}
    connexion('');
  }

  async function demarrer() {
    if (!window.crypto || !crypto.subtle || typeof DecompressionStream === 'undefined') {
      document.body.innerHTML = '<p style="font-family:system-ui;padding:24px">Ce navigateur est trop ancien pour ouvrir cette page. Mets-le à jour (Chrome, Safari, Edge ou Firefox récents).</p>'; return;
    }
    if (/[?&]sortir\b/.test(location.search)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} await sortir(); return; }
    var k = cleStockee();
    if (k) { try { if (await ouvrir(k)) return; } catch (e) { try { sessionStorage.removeItem(STOCK); } catch (x) {} } }
    if (!document.getElementById('easy-chiffre')) return;
    afficher('<form><h1>' + NOM + '</h1><p class="ea-sous">Ouverture…</p></form>');
    try {
      var a = await auth(), u = await etat(a);
      if (u) await avecCompte(u); else connexion('');
    } catch (e) { connexion(msgErreur(e)); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();

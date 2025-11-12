# 🔧 Mejoras Sugeridas - AppDistriRaga Frontend

**Fecha de análisis**: 12 de noviembre de 2025  
**Versión actual**: 1.2.4

---

## 📋 Índice

- [Prioridad Alta - Seguridad y Estabilidad](#-prioridad-alta---seguridad-y-estabilidad)
- [Prioridad Media - Performance y UX](#-prioridad-media---performance-y-ux)
- [Prioridad Baja - Mejores Prácticas](#-prioridad-baja---mejores-prácticas)
- [Mejoras Opcionales - Features](#-mejoras-opcionales---features)
- [Plan de Implementación](#-plan-de-implementación)

---

## 🔴 PRIORIDAD ALTA - Seguridad y Estabilidad

### 1. ❌ Archivo `.env` expuesto en repositorio

**📍 Ubicación**: `/appdistriraga/.env`

**Problema detectado**:
```bash
# El archivo .env NO está en .gitignore
# Contiene:
REACT_APP_API_URL=http://localhost:8080/api/
REACT_APP_API_URL_LOGIN=http://localhost:8080/auth/
```

**Riesgo**: 
- 🔒 Exposición de credenciales y URLs sensibles
- 🔒 Variables de producción podrían filtrarse al repositorio

**Solución**:

1. Actualizar `.gitignore`:
```bash
# Agregar al archivo .gitignore
.env
.env.local
.env.development
.env.production
```

2. Crear `.env.example`:
```bash
# .env.example
GENERATE_SOURCEMAP=false
REACT_APP_API_URL=http://localhost:8080/api/
REACT_APP_API_URL_LOGIN=http://localhost:8080/auth/
REACT_APP_REQUEST_TIMEOUT=30000
```

3. Ejecutar:
```bash
git rm --cached .env
git add .gitignore .env.example
git commit -m "chore: Remove .env from repository and add .env.example"
```

---

### 2. ❌ Manejo de errores incompleto en Contextos

**📍 Ubicación**: 
- `src/context/EdificiosContext.js` (líneas 70-77, 94-101)
- `src/context/ApartamentosContext.js`
- `src/context/ClientesContext.js`
- `src/context/EspaciosContext.js`
- `src/context/CotizacionContext.js`

**Problema detectado**:
```javascript
api.post(endpoint, options).then((res) => {
    if(!res.err){
        dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
        navigate('/admin/edificios/');
        setType("success");
        setMessage("The registry was updated correctly");
        setStatus(1);
    }else{
        // ❌ BLOQUE VACÍO - No maneja el error
    }
    setLoading(false);
})
```

**Riesgo**:
- 🚨 Errores silenciosos que confunden al usuario
- 🚨 No hay feedback cuando falla una operación

**Solución**:

```javascript
// En saveData
api.post(endpoint, options).then((res) => {
    if(!res.err){
        dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
        navigate('/admin/edificios/');
        setType("success");
        setMessage("Registro creado correctamente");
        setStatus(1);
    }else{
        setType("danger");
        setMessage(res.message || "Error al crear el registro");
        setStatus(1);
    }
    setLoading(false);
})

// En updateData
api.put(endpoint, options).then((res) => {
    if(!res.err){
        setDetail(res.data);
        dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
        navigate('/admin/edificios');
        setType("success");
        setMessage("Registro actualizado correctamente");
        setStatus(1);
    }else{
        setType("danger");
        setMessage(res.message || "Error al actualizar el registro");
        setStatus(1);
    }
    setLoading(false);
})
```

**Aplicar en todos los contextos**: Edificios, Apartamentos, Clientes, Espacios, Cotizaciones

---

### 3. ❌ Validación incorrecta de números de celular

**📍 Ubicación**: `src/services/EdificiosForm.js` (línea 44-50)

**Problema detectado**:
```javascript
if (!form.celular) {
    errores.celular = "Please the field is required.";
} else if (!regexText40.test(form.celular.trim())) {
    // ❌ Valida celular como texto genérico, no como número
    errores.celular = "The field accepts up to 40 characters.";
}
```

**Riesgo**:
- 📞 Acepta letras y caracteres especiales en campos de teléfono
- 📞 No valida formato de número telefónico

**Solución**:

```javascript
// Agregar regex para teléfonos
let regexPhone = /^[0-9]{7,15}$/; // 7 a 15 dígitos

if (!form.celular) {
    errores.celular = "El campo es requerido";
} else if (!regexPhone.test(form.celular.trim())) {
    errores.celular = "Ingrese un número de teléfono válido (solo números, 7-15 dígitos)";
} else {
    errores.celular = "";
}
```

**Aplicar en**: 
- `EdificiosForm.js` (campo celular)
- `ClientesForm.js` (campo celular)
- Cualquier otro formulario con campos telefónicos

---

### 4. ❌ Token hardcodeado con nombre genérico

**📍 Ubicación**: `src/services/auth.js` (líneas 19, 23, 41, 45)

**Problema detectado**:
```javascript
const logout = () => {
  localStorage.removeItem("token_hensall_energy"); // ❌ Nombre de otro proyecto
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token_hensall_energy"));
};
```

**Riesgo**:
- 🔑 Nombre de token no representa el proyecto actual
- 🔑 Posible conflicto con otros proyectos en localhost

**Solución**:

Opción 1 - Constante en el archivo:
```javascript
// src/services/auth.js
const TOKEN_KEY = "token_distriraga_app";

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};
```

Opción 2 - Variable de entorno (recomendado):
```javascript
// .env
REACT_APP_TOKEN_KEY=token_distriraga_app

// src/services/auth.js
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || "token_distriraga_app";
```

---

### 5. ❌ Función de login no implementada

**📍 Ubicación**: `src/services/auth.js` (líneas 7-17)

**Problema detectado**:
```javascript
const login = (data) => {
  //return axios
    //.post(API_URL + "/login", data)
    //.then((response) => {
      //if (response.data.access_token) {
        //localStorage.setItem("token_hensall_energy", JSON.stringify(response.data.access_token));
      //}

      //return response.data;
    //});
};
```

**Riesgo**:
- 🚫 Función crítica no funcional
- 🚫 Código muerto que genera confusión

**Solución**:

Opción 1 - Implementar:
```javascript
import { helpHttp } from "helpers/helpHttp";

const TOKEN_KEY = "token_distriraga_app";
const { REACT_APP_API_URL_LOGIN } = process.env;

const login = async (data) => {
  try {
    const api = helpHttp();
    const response = await api.post(REACT_APP_API_URL_LOGIN + "login", {
      body: data,
      headers: { "Content-Type": "application/json" }
    });

    if (!response.err && response.token) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(response.token));
      return { success: true, data: response };
    } else {
      return { success: false, message: response.message || "Error en el login" };
    }
  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
};
```

Opción 2 - Eliminar si no se usa:
```javascript
// Simplemente eliminar la función si no se implementará
```

---

## 🟠 PRIORIDAD MEDIA - Performance y UX

### 6. ⚠️ Dependencias faltantes en useEffect

**📍 Ubicación**: `src/context/EdificiosContext.js` (líneas 30-32)

**Problema detectado**:
```javascript
useEffect(() => {
    fetchData(); // ❌ fetchData no está en el array de dependencias
},[]);
```

**Riesgo**:
- ⚡ Warning en consola de React
- ⚡ Comportamiento impredecible en re-renders

**Solución**:

```javascript
const EdificiosProvider = ({children}) => {
    // ... código existente ...

    // Envolver fetchData en useCallback
    const fetchData = useCallback(() => {
        setLoading(true);
        api.get(url).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
            }else{
                dispatch({ type: TYPES.NO_DATA });
            }
            setLoading(false);
        });
    }, [url, api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Ahora incluye la dependencia
}
```

**Aplicar en todos los contextos**

---

### 7. ⚠️ Mutación directa de variables

**📍 Ubicación**: `src/context/EdificiosContext.js` (líneas 27, 51)

**Problema detectado**:
```javascript
let url = REACT_APP_API_URL+"edificio";

const fetchDataDetail = () => {
    setLoading(true);
    url = url+"/"+toUpdate; // ❌ Mutación de variable
    api.get(url).then((res) => {
```

**Riesgo**:
- 🔄 La URL se modifica permanentemente después de la primera llamada
- 🔄 Posibles bugs en llamadas subsecuentes

**Solución**:

```javascript
const EdificiosProvider = ({children}) => {
    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;
    
    // Constante inmutable
    const BASE_URL = REACT_APP_API_URL + "edificio";

    const fetchData = () => {
        setLoading(true);
        api.get(BASE_URL).then((res) => {
            // ...
        });
    };

    const fetchDataDetail = () => {
        setLoading(true);
        const detailUrl = `${BASE_URL}/${toUpdate}`; // Construir nueva URL
        api.get(detailUrl).then((res) => {
            setDetail(res.data);
            setLoading(false);
        });
    };

    const saveData = (data) => {
        setLoading(true);
        const endpoint = BASE_URL; // Usar constante
        // ...
    };

    const updateData = (data) => {
        setLoading(true);
        const endpoint = `${BASE_URL}/${data.id}`; // Construir nueva URL
        // ...
    };
}
```

---

### 8. ⚠️ Mensajes hardcodeados en inglés

**📍 Ubicación**: Todos los contextos y validaciones

**Problema detectado**:
```javascript
setMessage("The registry was updated correctly"); // Inglés
errores.nombre = "Please the field is required."; // Inglés
```

**Riesgo**:
- 🌐 Inconsistencia de idioma (UI en español, mensajes en inglés)
- 🌐 Mala experiencia de usuario

**Solución**:

Crear archivo de constantes:
```javascript
// src/constants/messages.js
export const MESSAGES = {
  SUCCESS: {
    CREATE: "Registro creado correctamente",
    UPDATE: "Registro actualizado correctamente",
    DELETE: "Registro eliminado correctamente",
  },
  ERROR: {
    CREATE: "Error al crear el registro",
    UPDATE: "Error al actualizar el registro",
    DELETE: "Error al eliminar el registro",
    GENERIC: "Ocurrió un error inesperado",
    CONNECTION: "Error de conexión con el servidor",
  },
  VALIDATION: {
    REQUIRED: "Este campo es requerido",
    MAX_LENGTH: (max) => `Máximo ${max} caracteres permitidos`,
    MIN_LENGTH: (min) => `Mínimo ${min} caracteres requeridos`,
    INVALID_PHONE: "Número de teléfono inválido",
    INVALID_EMAIL: "Correo electrónico inválido",
  }
};

// Uso en contextos:
import { MESSAGES } from "constants/messages";

setMessage(MESSAGES.SUCCESS.CREATE);
setMessage(MESSAGES.ERROR.UPDATE);
```

---

### 9. ⚠️ Console.log en código de producción

**📍 Ubicación**:
- `src/views/Index.js` (línea 117)
- `src/context/VentaContext.js` (línea 200)
- `src/context/CompraContext.js` (línea 200)

**Problema detectado**:
```javascript
getDatasetAtEvent={(e) => console.log(e)} // Index.js
console.log(data); // VentaContext.js, CompraContext.js
```

**Riesgo**:
- 📊 Información sensible expuesta en consola de producción
- 📊 Ruido en consola del navegador

**Solución**:

Opción 1 - Eliminar:
```javascript
// Simplemente eliminar las líneas
```

Opción 2 - Logger condicional:
```javascript
// src/utils/logger.js
export const logger = {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(...args);
    }
  },
};

// Uso:
import { logger } from "utils/logger";
logger.log(data); // Solo aparece en desarrollo
```

---

### 10. ⚠️ Timeout hardcodeado

**📍 Ubicación**: `src/helpers/helpHttp.js` (línea 33)

**Problema detectado**:
```javascript
setTimeout(() => controller.abort(), 30000); // ❌ 30 segundos hardcodeado
```

**Riesgo**:
- ⏱️ No se puede ajustar según necesidades
- ⏱️ Difícil de modificar para diferentes entornos

**Solución**:

```javascript
// .env
REACT_APP_REQUEST_TIMEOUT=30000

// src/helpers/helpHttp.js
export const helpHttp = () => {
    const customFecth = (endpoint, options) => {
        const timeout = parseInt(process.env.REACT_APP_REQUEST_TIMEOUT) || 30000;
        
        const controller = new AbortController();
        options.signal = controller.signal;
        
        setTimeout(() => controller.abort(), timeout);
        
        // ... resto del código
    };
};
```

---

## 🟡 PRIORIDAD BAJA - Mejores Prácticas

### 11. 📝 Sin tests unitarios

**Problema**: No existen archivos de test en el proyecto

**Solución sugerida**:

```bash
# Instalar dependencias
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Crear estructura de tests
mkdir -p src/__tests__/components
mkdir -p src/__tests__/hooks
mkdir -p src/__tests__/contexts
```

Ejemplo de test:
```javascript
// src/__tests__/hooks/useForm.test.js
import { renderHook, act } from '@testing-library/react';
import { useForm } from 'hooks/useForm';

describe('useForm', () => {
  const initialForm = { nombre: '', email: '' };
  const validateForm = jest.fn();

  it('should initialize with initial values', () => {
    const { result } = renderHook(() => useForm(initialForm, validateForm));
    expect(result.current.form).toEqual(initialForm);
  });

  it('should update form values on change', () => {
    const { result } = renderHook(() => useForm(initialForm, validateForm));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'nombre', value: 'Juan' }
      });
    });

    expect(result.current.form.nombre).toBe('Juan');
  });
});
```

---

### 12. 📝 PropTypes faltantes

**📍 Ubicación**: Mayoría de componentes

**Problema**: Solo `Sidebar` y `SimpleHeader` tienen PropTypes

**Solución**:

```javascript
// src/views/pages/edificios/List.jsx
import PropTypes from 'prop-types';

function List({ tab }) {
  // ... código existente
}

List.propTypes = {
  tab: PropTypes.string
};

export default List;

// src/views/pages/edificios/Form.jsx
import PropTypes from 'prop-types';

const Formulario = () => {
  // ... código existente
};

// Si no recibe props, documentarlo
Formulario.propTypes = {};

export default Formulario;
```

---

### 13. 📝 Código duplicado entre contextos

**Problema**: Los 5 contextos tienen lógica CRUD idéntica

**Solución**: Crear hook genérico

```javascript
// src/hooks/useGenericCRUD.js
import { useReducer, useCallback, useContext } from "react";
import { helpHttp } from "helpers/helpHttp";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";
import { MESSAGES } from "constants/messages";

export const useGenericCRUD = (endpoint, redirectPath) => {
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const { setMessage, setStatus, setType } = useContext(NotificationContext);
  const { setLoading } = useContext(LoadingContext);
  
  const [state, dispatch] = useReducer(genericReducer, genericInitialState);
  const { db } = state;
  
  const api = helpHttp();
  const BASE_URL = REACT_APP_API_URL + endpoint;

  const fetchData = useCallback(() => {
    setLoading(true);
    api.get(BASE_URL).then((res) => {
      if(!res.err){
        dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
      }else{
        dispatch({ type: TYPES.NO_DATA });
        setType("danger");
        setMessage(res.message || MESSAGES.ERROR.GENERIC);
        setStatus(1);
      }
      setLoading(false);
    });
  }, [BASE_URL]);

  const fetchDataDetail = useCallback((id) => {
    setLoading(true);
    api.get(`${BASE_URL}/${id}`).then((res) => {
      if(!res.err){
        return res.data;
      }else{
        setType("danger");
        setMessage(res.message || MESSAGES.ERROR.GENERIC);
        setStatus(1);
      }
      setLoading(false);
    });
  }, [BASE_URL]);

  const createData = useCallback((data) => {
    setLoading(true);
    const newData = { ...data };
    delete newData.id;
    
    api.post(BASE_URL, {
      body: newData,
      headers: {"content-type":"application/json"}
    }).then((res) => {
      if(!res.err){
        dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
        navigate(redirectPath);
        setType("success");
        setMessage(MESSAGES.SUCCESS.CREATE);
        setStatus(1);
      }else{
        setType("danger");
        setMessage(res.message || MESSAGES.ERROR.CREATE);
        setStatus(1);
      }
      setLoading(false);
    });
  }, [BASE_URL, redirectPath]);

  const updateData = useCallback((data) => {
    setLoading(true);
    const newData = { ...data };
    delete newData.id;
    
    api.put(`${BASE_URL}/${data.id}`, {
      body: newData,
      headers: {"content-type":"application/json"}
    }).then((res) => {
      if(!res.err){
        dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
        navigate(redirectPath);
        setType("success");
        setMessage(MESSAGES.SUCCESS.UPDATE);
        setStatus(1);
      }else{
        setType("danger");
        setMessage(res.message || MESSAGES.ERROR.UPDATE);
        setStatus(1);
      }
      setLoading(false);
    });
  }, [BASE_URL, redirectPath]);

  const deleteData = useCallback((id) => {
    setLoading(true);
    api.del(`${BASE_URL}/${id}`, {
      headers: {"content-type":"application/json"}
    }).then((res) => {
      if(!res.err){
        dispatch({ type: TYPES.DELETE_DATA, payload: id });
        setType("success");
        setMessage(MESSAGES.SUCCESS.DELETE);
        setStatus(1);
      }else{
        setType("danger");
        setMessage(res.message || MESSAGES.ERROR.DELETE);
        setStatus(1);
      }
      setLoading(false);
    });
  }, [BASE_URL]);

  return {
    db,
    fetchData,
    fetchDataDetail,
    createData,
    updateData,
    deleteData
  };
};

// Uso en EdificiosContext:
import { useGenericCRUD } from "hooks/useGenericCRUD";

const EdificiosProvider = ({children}) => {
  const crud = useGenericCRUD("edificio", "/admin/edificios");
  
  return (
    <EdificiosContext.Provider value={crud}>
      {children}
    </EdificiosContext.Provider>
  );
};
```

---

### 14. 📝 Validaciones reutilizables

**Solución**:

```javascript
// src/utils/validators.js
export const validators = {
  required: (value, fieldName = "Este campo") => {
    return value && value.toString().trim() 
      ? "" 
      : `${fieldName} es requerido`;
  },

  maxLength: (value, max, fieldName = "Este campo") => {
    return value && value.length <= max
      ? ""
      : `${fieldName} acepta máximo ${max} caracteres`;
  },

  minLength: (value, min, fieldName = "Este campo") => {
    return value && value.length >= min
      ? ""
      : `${fieldName} requiere mínimo ${min} caracteres`;
  },

  phone: (value) => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(value?.toString().trim())
      ? ""
      : "Ingrese un número de teléfono válido (7-15 dígitos)";
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value?.toString().trim())
      ? ""
      : "Ingrese un correo electrónico válido";
  },

  numeric: (value, fieldName = "Este campo") => {
    return !isNaN(value)
      ? ""
      : `${fieldName} debe ser numérico`;
  },

  positiveNumber: (value, fieldName = "Este campo") => {
    return !isNaN(value) && parseFloat(value) > 0
      ? ""
      : `${fieldName} debe ser un número positivo`;
  }
};

// Uso en EdificiosForm.js:
import { validators } from "utils/validators";

export const validationsForm = (form) => {
  let errores = {};

  errores.nombre = validators.required(form.nombre, "Nombre") ||
                    validators.maxLength(form.nombre, 40, "Nombre");

  errores.celular = validators.required(form.celular, "Celular") ||
                     validators.phone(form.celular);

  // ... más validaciones

  return errores;
};
```

---

### 15. 📝 Variables de entorno no documentadas

**Solución**: Actualizar README

```markdown
## Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL base del API backend | `http://localhost:8080/api/` |
| `REACT_APP_API_URL_LOGIN` | URL de autenticación | `http://localhost:8080/auth/` |
| `REACT_APP_REQUEST_TIMEOUT` | Timeout de peticiones (ms) | `30000` |
| `REACT_APP_TOKEN_KEY` | Nombre de la clave del token en localStorage | `token_distriraga_app` |
| `GENERATE_SOURCEMAP` | Generar source maps en build | `false` |
```

---

### 16. 📝 Actualizar metadata en package.json

**📍 Ubicación**: `package.json`

**Problema**: Mantiene información de la plantilla

**Solución**:

```json
{
  "name": "appdistriraga",
  "version": "1.0.0",
  "description": "Sistema web de gestión inmobiliaria - DistriRaga",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tu-usuario/appdistriraga.git"
  },
  "keywords": [
    "react",
    "dashboard",
    "inmobiliaria",
    "distriraga",
    "gestion",
    "edificios",
    "apartamentos"
  ],
  "author": "FESC Team",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/tu-usuario/appdistriraga/issues"
  },
  "homepage": "https://github.com/tu-usuario/appdistriraga#readme"
}
```

---

### 17. 📝 Configurar ESLint y Prettier

**Solución**:

```bash
# Instalar dependencias
npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier
```

Crear `.eslintrc.json`:
```json
{
  "extends": [
    "react-app",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "warn",
    "prefer-const": "error"
  }
}
```

Crear `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

Agregar scripts en `package.json`:
```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx}",
    "lint:fix": "eslint src/**/*.{js,jsx} --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,scss,md}\""
  }
}
```

---

### 18. 📝 Filtrado ineficiente en tablas

**📍 Ubicación**: Todos los archivos `List.jsx`

**Problema**:
```javascript
const filteredData = data.filter(item =>
  Object.values(item).join(" ").toLowerCase().includes(filter.toLowerCase())
);
```

**Solución**: Filtrar solo campos relevantes

```javascript
// src/views/pages/edificios/List.jsx
const filteredData = data.filter(item => {
  const searchableFields = [
    item.nombre,
    item.direccion,
    item.ciudad,
    item.ubicacion,
    item.estado
  ];
  
  return searchableFields
    .join(" ")
    .toLowerCase()
    .includes(filter.toLowerCase());
});
```

---

### 19. 📝 Estados de carga específicos

**Problema**: Solo hay un loading global

**Solución**:

```javascript
// En contextos
const [loadingStates, setLoadingStates] = useState({
  list: false,
  detail: false,
  create: false,
  update: false,
  delete: false
});

const setLoadingState = (key, value) => {
  setLoadingStates(prev => ({ ...prev, [key]: value }));
};

// Uso:
const fetchData = () => {
  setLoadingState('list', true);
  api.get(BASE_URL).then((res) => {
    // ...
    setLoadingState('list', false);
  });
};
```

---

## 💡 MEJORAS OPCIONALES - Features

### 20. Paginación del servidor

```javascript
// Backend debe soportar:
// GET /api/edificio?page=1&size=10

const [pagination, setPagination] = useState({
  page: 1,
  size: 10,
  total: 0
});

const fetchData = (page = 1, size = 10) => {
  setLoading(true);
  api.get(`${BASE_URL}?page=${page}&size=${size}`).then((res) => {
    if(!res.err){
      dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data.content });
      setPagination({
        page: res.data.page,
        size: res.data.size,
        total: res.data.totalElements
      });
    }
    setLoading(false);
  });
};
```

---

### 21. React Query para caché

```bash
npm install @tanstack/react-query
```

```javascript
// src/index.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* ... */}
    </BrowserRouter>
  </QueryClientProvider>
);

// En componentes:
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['edificios'],
  queryFn: () => api.get(BASE_URL)
});
```

---

### 22. Exportar datos a Excel

```bash
npm install xlsx file-saver
```

```javascript
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Edificios");
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `edificios_${new Date().toISOString()}.xlsx`);
};

// En List.jsx:
<Button onClick={exportToExcel}>
  <i className="fa fa-file-excel" /> Exportar a Excel
</Button>
```

---

### 23. Tema oscuro

```javascript
// src/contexts/ThemeContext.js
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

### 24. Búsqueda avanzada

```javascript
// Filtros por columna específica
const [filters, setFilters] = useState({
  nombre: '',
  ciudad: '',
  estado: ''
});

const filteredData = data.filter(item => {
  return (
    (!filters.nombre || item.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
    (!filters.ciudad || item.ciudad.toLowerCase().includes(filters.ciudad.toLowerCase())) &&
    (!filters.estado || item.estado === filters.estado)
  );
});
```

---

## 📊 PLAN DE IMPLEMENTACIÓN

### 🌿 Estrategia de Branches

Cada mejora se implementará en su propia rama siguiendo esta nomenclatura:

- `fix/XXX-descripcion` - Para correcciones de bugs y errores
- `feature/XXX-descripcion` - Para nuevas funcionalidades
- `refactor/XXX-descripcion` - Para refactorización de código
- `chore/XXX-descripcion` - Para tareas de mantenimiento

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### 🔴 Fase 1 - Seguridad Crítica (Semana 1)

#### Branch: `chore/001-env-security`
**Objetivo**: Proteger variables de entorno

**Checklist**:
- [ ] Verificar que `.env` no esté en repositorio remoto
- [ ] Agregar `.env*` al `.gitignore`
- [ ] Crear archivo `.env.example` con valores de plantilla
- [ ] Ejecutar `git rm --cached .env` si existe en git
- [ ] Commit: `chore: add .env to gitignore and create .env.example`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `.gitignore`
- `.env.example` (nuevo)

**Tiempo estimado**: 15 minutos

---

#### Branch: `fix/002-error-handling-contexts`
**Objetivo**: Completar manejo de errores en todos los contextos

**Checklist**:
- [ ] Crear archivo `src/constants/messages.js` con mensajes
- [ ] Actualizar `src/context/EdificiosContext.js`
  - [ ] Agregar manejo de error en `saveData()`
  - [ ] Agregar manejo de error en `updateData()`
  - [ ] Agregar manejo de error en `fetchData()`
  - [ ] Agregar manejo de error en `fetchDataDetail()`
- [ ] Actualizar `src/context/ApartamentosContext.js`
  - [ ] Agregar manejo de error en todas las funciones
- [ ] Actualizar `src/context/ClientesContext.js`
  - [ ] Agregar manejo de error en todas las funciones
- [ ] Actualizar `src/context/EspaciosContext.js`
  - [ ] Agregar manejo de error en todas las funciones
- [ ] Actualizar `src/context/CotizacionContext.js`
  - [ ] Agregar manejo de error en todas las funciones
- [ ] Probar cada módulo creando, editando y eliminando
- [ ] Commit: `fix: add error handling to all context providers`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/constants/messages.js` (nuevo)
- `src/context/EdificiosContext.js`
- `src/context/ApartamentosContext.js`
- `src/context/ClientesContext.js`
- `src/context/EspaciosContext.js`
- `src/context/CotizacionContext.js`

**Tiempo estimado**: 2 horas

---

#### Branch: `fix/003-token-key-rename`
**Objetivo**: Cambiar nombre del token hardcodeado

**Checklist**:
- [ ] Actualizar `.env.example` con `REACT_APP_TOKEN_KEY`
- [ ] Agregar `REACT_APP_TOKEN_KEY=token_distriraga_app` a `.env`
- [ ] Modificar `src/services/auth.js`
  - [ ] Crear constante `TOKEN_KEY` desde env
  - [ ] Reemplazar todos los `"token_hensall_energy"` con `TOKEN_KEY`
- [ ] Probar login/logout
- [ ] Limpiar localStorage en navegador antes de probar
- [ ] Commit: `fix: update token key name and use environment variable`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `.env.example`
- `src/services/auth.js`

**Tiempo estimado**: 30 minutos

---

#### Branch: `fix/004-phone-validation`
**Objetivo**: Corregir validación de números telefónicos

**Checklist**:
- [ ] Actualizar `src/services/EdificiosForm.js`
  - [ ] Agregar regex de teléfono `let regexPhone = /^[0-9]{7,15}$/;`
  - [ ] Modificar validación del campo `celular`
- [ ] Actualizar `src/services/ClientesForm.js`
  - [ ] Agregar regex de teléfono
  - [ ] Modificar validación del campo `celular`
- [ ] Probar formularios con:
  - [ ] Números válidos (10 dígitos)
  - [ ] Números inválidos (letras, símbolos)
  - [ ] Números muy cortos (< 7 dígitos)
  - [ ] Números muy largos (> 15 dígitos)
- [ ] Commit: `fix: improve phone number validation in forms`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/services/EdificiosForm.js`
- `src/services/ClientesForm.js`

**Tiempo estimado**: 30 minutos

---

#### Branch: `fix/005-login-implementation`
**Objetivo**: Implementar o eliminar función de login

**Checklist**:
- [ ] Revisar si `src/views/pages/login/Login.jsx` usa la función
- [ ] **Opción A - Implementar**:
  - [ ] Implementar función `login()` en `src/services/auth.js`
  - [ ] Probar login con credenciales válidas
  - [ ] Probar login con credenciales inválidas
  - [ ] Verificar que guarda token correctamente
- [ ] **Opción B - Eliminar**:
  - [ ] Eliminar función `login()` si no se usa
  - [ ] Eliminar imports relacionados
- [ ] Commit: `fix: implement login function with proper error handling` o `chore: remove unused login function`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/services/auth.js`
- Posiblemente `src/views/pages/login/Login.jsx`

**Tiempo estimado**: 1 hora

---

### 🟠 Fase 2 - Estabilidad y Performance (Semana 2)

#### Branch: `fix/006-useeffect-dependencies`
**Objetivo**: Corregir dependencias faltantes en useEffect

**Checklist**:
- [ ] Instalar extensión ESLint en VSCode (si no está)
- [ ] En `src/context/EdificiosContext.js`:
  - [ ] Envolver `fetchData` en `useCallback`
  - [ ] Envolver `fetchDataDetail` en `useCallback`
  - [ ] Agregar dependencias correctas a useEffect
- [ ] Repetir para `src/context/ApartamentosContext.js`
- [ ] Repetir para `src/context/ClientesContext.js`
- [ ] Repetir para `src/context/EspaciosContext.js`
- [ ] Repetir para `src/context/CotizacionContext.js`
- [ ] Verificar que no hay warnings en consola
- [ ] Commit: `fix: add missing useEffect dependencies with useCallback`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/context/EdificiosContext.js`
- `src/context/ApartamentosContext.js`
- `src/context/ClientesContext.js`
- `src/context/EspaciosContext.js`
- `src/context/CotizacionContext.js`

**Tiempo estimado**: 1.5 horas

---

#### Branch: `refactor/007-immutable-urls`
**Objetivo**: Eliminar mutación de variables URL

**Checklist**:
- [ ] En `src/context/EdificiosContext.js`:
  - [ ] Crear constante `BASE_URL`
  - [ ] Modificar `fetchData()` para usar `BASE_URL`
  - [ ] Modificar `fetchDataDetail()` para construir URL con template literal
  - [ ] Modificar `saveData()` para usar `BASE_URL`
  - [ ] Modificar `updateData()` para construir URL
  - [ ] Modificar `deleteData()` para construir URL
- [ ] Repetir para todos los contextos
- [ ] Probar CRUD completo en cada módulo
- [ ] Commit: `refactor: use immutable URLs in context providers`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/context/EdificiosContext.js`
- `src/context/ApartamentosContext.js`
- `src/context/ClientesContext.js`
- `src/context/EspaciosContext.js`
- `src/context/CotizacionContext.js`

**Tiempo estimado**: 1 hora

---

#### Branch: `refactor/008-spanish-messages`
**Objetivo**: Traducir mensajes a español

**Checklist**:
- [ ] Verificar que `src/constants/messages.js` existe (creado en fix/002)
- [ ] Actualizar todos los contextos para usar `MESSAGES`
- [ ] Actualizar `src/services/EdificiosForm.js`
  - [ ] Cambiar mensajes de validación a español
- [ ] Actualizar `src/services/ApartamentosForm.js`
- [ ] Actualizar `src/services/ClientesForm.js`
- [ ] Actualizar `src/services/EspaciosForm.js`
- [ ] Actualizar `src/services/CotizacionForm.js`
- [ ] Actualizar todos los demás archivos `*Form.js`
- [ ] Probar todos los formularios y ver mensajes en español
- [ ] Commit: `refactor: translate all messages to Spanish`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- Todos los archivos en `src/services/*Form.js`
- Todos los archivos en `src/context/*Context.js`

**Tiempo estimado**: 2 horas

---

#### Branch: `chore/009-remove-console-logs`
**Objetivo**: Eliminar console.log de producción

**Checklist**:
- [ ] Crear `src/utils/logger.js` con logger condicional
- [ ] Modificar `src/views/Index.js` línea 117
  - [ ] Eliminar o reemplazar con logger
- [ ] Modificar `src/context/VentaContext.js` línea 200
  - [ ] Eliminar o reemplazar con logger
- [ ] Modificar `src/context/CompraContext.js` línea 200
  - [ ] Eliminar o reemplazar con logger
- [ ] Buscar otros console.log: `grep -r "console.log" src/`
- [ ] Probar que no hay console.log en build de producción
- [ ] Commit: `chore: remove console.log statements and add conditional logger`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `src/utils/logger.js` (nuevo)
- `src/views/Index.js`
- `src/context/VentaContext.js`
- `src/context/CompraContext.js`

**Tiempo estimado**: 30 minutos

---

#### Branch: `refactor/010-configurable-timeout`
**Objetivo**: Mover timeout a variable de entorno

**Checklist**:
- [ ] Actualizar `.env.example` con `REACT_APP_REQUEST_TIMEOUT=30000`
- [ ] Agregar a `.env` local
- [ ] Modificar `src/helpers/helpHttp.js`
  - [ ] Leer timeout desde `process.env.REACT_APP_REQUEST_TIMEOUT`
  - [ ] Usar valor por defecto de 30000
- [ ] Probar con timeout corto (5000) para verificar
- [ ] Restaurar timeout a 30000
- [ ] Commit: `refactor: make request timeout configurable via environment variable`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `.env.example`
- `src/helpers/helpHttp.js`

**Tiempo estimado**: 20 minutos

---

### 🟡 Fase 3 - Calidad de Código (Semana 3)

#### Branch: `feature/011-unit-tests`
**Objetivo**: Agregar tests unitarios básicos

**Checklist**:
- [ ] Instalar dependencias: `npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- [ ] Crear estructura de carpetas
  - [ ] `src/__tests__/components/`
  - [ ] `src/__tests__/hooks/`
  - [ ] `src/__tests__/utils/`
- [ ] Crear `src/__tests__/hooks/useForm.test.js`
  - [ ] Test de inicialización
  - [ ] Test de handleChange
  - [ ] Test de validación
- [ ] Crear `src/__tests__/utils/validators.test.js` (si existe)
- [ ] Crear `src/__tests__/components/List.test.js`
- [ ] Ejecutar tests: `npm test`
- [ ] Verificar cobertura mínima del 40%
- [ ] Commit: `test: add basic unit tests for hooks and components`
- [ ] Crear PR y mergear a `develop`

**Archivos nuevos**:
- `src/__tests__/hooks/useForm.test.js`
- `src/__tests__/utils/validators.test.js`
- `src/__tests__/components/List.test.js`

**Tiempo estimado**: 3 horas

---

#### Branch: `refactor/012-add-proptypes`
**Objetivo**: Agregar PropTypes a componentes

**Checklist**:
- [ ] Instalar si no existe: `npm install prop-types`
- [ ] Agregar PropTypes a `src/views/pages/edificios/List.jsx`
- [ ] Agregar PropTypes a `src/views/pages/edificios/Form.jsx`
- [ ] Agregar PropTypes a `src/views/pages/apartamentos/List.jsx`
- [ ] Agregar PropTypes a `src/views/pages/apartamentos/Form.jsx`
- [ ] Agregar PropTypes a `src/views/pages/clientes/List.jsx`
- [ ] Agregar PropTypes a `src/views/pages/clientes/Form.jsx`
- [ ] Agregar PropTypes a `src/views/pages/espacios/List.jsx`
- [ ] Agregar PropTypes a `src/views/pages/espacios/Form.jsx`
- [ ] Agregar PropTypes a `src/views/pages/cotizacion/List.jsx`
- [ ] Agregar PropTypes a `src/views/pages/cotizacion/Form.jsx`
- [ ] Agregar PropTypes a componentes en `src/components/`
- [ ] Verificar que no hay warnings de PropTypes
- [ ] Commit: `refactor: add PropTypes validation to all components`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- Todos los archivos en `src/views/pages/*/List.jsx`
- Todos los archivos en `src/views/pages/*/Form.jsx`
- Componentes en `src/components/`

**Tiempo estimado**: 2 horas

---

#### Branch: `refactor/013-generic-crud-hook`
**Objetivo**: Crear hook genérico para operaciones CRUD

**Checklist**:
- [ ] Crear `src/hooks/useGenericCRUD.js`
  - [ ] Implementar lógica genérica de fetch
  - [ ] Implementar lógica genérica de create
  - [ ] Implementar lógica genérica de update
  - [ ] Implementar lógica genérica de delete
  - [ ] Incluir manejo de errores
  - [ ] Incluir loading states
- [ ] Refactorizar `src/context/EdificiosContext.js` para usar el hook
- [ ] Probar módulo de edificios
- [ ] Refactorizar `src/context/ApartamentosContext.js`
- [ ] Probar módulo de apartamentos
- [ ] Refactorizar contextos restantes uno por uno
- [ ] Probar CRUD completo en cada módulo
- [ ] Commit: `refactor: create generic CRUD hook to reduce code duplication`
- [ ] Crear PR y mergear a `develop`

**Archivos nuevos**:
- `src/hooks/useGenericCRUD.js`

**Archivos modificados**:
- `src/context/EdificiosContext.js`
- `src/context/ApartamentosContext.js`
- `src/context/ClientesContext.js`
- `src/context/EspaciosContext.js`
- `src/context/CotizacionContext.js`

**Tiempo estimado**: 4 horas

---

#### Branch: `refactor/014-reusable-validators`
**Objetivo**: Crear validadores reutilizables

**Checklist**:
- [ ] Crear `src/utils/validators.js`
  - [ ] Implementar `required()`
  - [ ] Implementar `maxLength()`
  - [ ] Implementar `minLength()`
  - [ ] Implementar `phone()`
  - [ ] Implementar `email()`
  - [ ] Implementar `numeric()`
  - [ ] Implementar `positiveNumber()`
- [ ] Refactorizar `src/services/EdificiosForm.js` para usar validators
- [ ] Refactorizar `src/services/ApartamentosForm.js`
- [ ] Refactorizar `src/services/ClientesForm.js`
- [ ] Refactorizar `src/services/EspaciosForm.js`
- [ ] Refactorizar `src/services/CotizacionForm.js`
- [ ] Refactorizar todos los demás `*Form.js`
- [ ] Probar validación en todos los formularios
- [ ] Commit: `refactor: create reusable validators utility`
- [ ] Crear PR y mergear a `develop`

**Archivos nuevos**:
- `src/utils/validators.js`

**Archivos modificados**:
- Todos los archivos `src/services/*Form.js`

**Tiempo estimado**: 2 horas

---

#### Branch: `chore/015-update-package-json`
**Objetivo**: Actualizar metadata del proyecto

**Checklist**:
- [ ] Modificar `package.json`
  - [ ] Cambiar `name` a `"appdistriraga"`
  - [ ] Actualizar `version` a `"1.0.0"`
  - [ ] Actualizar `description`
  - [ ] Actualizar `repository.url`
  - [ ] Actualizar `keywords`
  - [ ] Actualizar `author`
  - [ ] Actualizar `bugs.url`
  - [ ] Actualizar `homepage`
- [ ] Commit: `chore: update package.json metadata for DistriRaga project`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `package.json`

**Tiempo estimado**: 15 minutos

---

#### Branch: `chore/016-eslint-prettier-setup`
**Objetivo**: Configurar ESLint y Prettier

**Checklist**:
- [ ] Instalar dependencias: `npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier`
- [ ] Crear `.eslintrc.json`
- [ ] Crear `.prettierrc`
- [ ] Crear `.prettierignore`
- [ ] Agregar scripts a `package.json`:
  - [ ] `"lint": "eslint src/**/*.{js,jsx}"`
  - [ ] `"lint:fix": "eslint src/**/*.{js,jsx} --fix"`
  - [ ] `"format": "prettier --write \"src/**/*.{js,jsx,json,css,scss,md}\""`
- [ ] Ejecutar `npm run lint` y verificar warnings
- [ ] Ejecutar `npm run format` para formatear código
- [ ] Configurar VSCode settings (opcional)
- [ ] Commit: `chore: setup ESLint and Prettier for code quality`
- [ ] Crear PR y mergear a `develop`

**Archivos nuevos**:
- `.eslintrc.json`
- `.prettierrc`
- `.prettierignore`

**Archivos modificados**:
- `package.json`

**Tiempo estimado**: 1 hora

---

### 🔵 Fase 4 - Optimización (Semana 4)

#### Branch: `refactor/017-optimize-table-filtering`
**Objetivo**: Optimizar filtrado de tablas

**Checklist**:
- [ ] Modificar `src/views/pages/edificios/List.jsx`
  - [ ] Cambiar filtrado de `Object.values()` a campos específicos
- [ ] Modificar `src/views/pages/apartamentos/List.jsx`
- [ ] Modificar `src/views/pages/clientes/List.jsx`
- [ ] Modificar `src/views/pages/espacios/List.jsx`
- [ ] Modificar `src/views/pages/cotizacion/List.jsx`
- [ ] Probar búsqueda en cada tabla
- [ ] Verificar performance con tablas grandes (>100 registros)
- [ ] Commit: `refactor: optimize table filtering for better performance`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- Todos los `src/views/pages/*/List.jsx`

**Tiempo estimado**: 1 hora

---

#### Branch: `feature/018-specific-loading-states`
**Objetivo**: Implementar estados de carga específicos

**Checklist**:
- [ ] Crear `src/hooks/useLoadingStates.js`
  - [ ] Implementar hook para manejar múltiples loading states
- [ ] Modificar `src/context/EdificiosContext.js`
  - [ ] Reemplazar `setLoading(true/false)` con estados específicos
  - [ ] Implementar loadingList, loadingCreate, loadingUpdate, loadingDelete
- [ ] Modificar `src/views/pages/edificios/List.jsx`
  - [ ] Mostrar loading específico en tabla
  - [ ] Mostrar loading específico en botón eliminar
- [ ] Modificar `src/views/pages/edificios/Form.jsx`
  - [ ] Mostrar loading en botón guardar
  - [ ] Mostrar loading en botón actualizar
- [ ] Repetir para otros módulos
- [ ] Commit: `feature: implement specific loading states for better UX`
- [ ] Crear PR y mergear a `develop`

**Archivos nuevos**:
- `src/hooks/useLoadingStates.js`

**Archivos modificados**:
- Todos los contextos
- Todos los List.jsx
- Todos los Form.jsx

**Tiempo estimado**: 3 horas

---

#### Branch: `docs/019-environment-variables`
**Objetivo**: Documentar variables de entorno

**Checklist**:
- [ ] Actualizar README del proyecto
  - [ ] Agregar sección "Variables de Entorno"
  - [ ] Documentar cada variable
  - [ ] Agregar tabla con descripciones
  - [ ] Agregar valores por defecto
  - [ ] Agregar ejemplos de uso
- [ ] Verificar que `.env.example` está completo
- [ ] Commit: `docs: add comprehensive environment variables documentation`
- [ ] Crear PR y mergear a `develop`

**Archivos modificados**:
- `README.md` o `README_PROYECTO.md`
- `.env.example`

**Tiempo estimado**: 30 minutos

---

### 💡 Fase 5 - Features Opcionales (Futuro)

#### Branch: `feature/020-server-pagination`
**Objetivo**: Implementar paginación desde el servidor

**Checklist**:
- [ ] Coordinar con backend para endpoint con paginación
- [ ] Crear `src/hooks/usePagination.js`
- [ ] Modificar contextos para soportar paginación
- [ ] Actualizar componentes List para mostrar paginación
- [ ] Agregar controles de paginación (siguiente, anterior, ir a página)
- [ ] Probar con diferentes tamaños de página
- [ ] Commit: `feature: implement server-side pagination`
- [ ] Crear PR y mergear a `develop`

**Tiempo estimado**: 4 horas

---

#### Branch: `feature/021-react-query-integration`
**Objetivo**: Integrar React Query para caché

**Checklist**:
- [ ] Instalar: `npm install @tanstack/react-query`
- [ ] Configurar QueryClient en `src/index.js`
- [ ] Crear queries personalizadas en `src/queries/`
- [ ] Migrar fetch de datos a useQuery
- [ ] Migrar mutations a useMutation
- [ ] Agregar invalidaciones de caché
- [ ] Configurar React Query DevTools
- [ ] Commit: `feature: integrate React Query for data fetching and caching`
- [ ] Crear PR y mergear a `develop`

**Tiempo estimado**: 6 horas

---

#### Branch: `feature/022-excel-export`
**Objetivo**: Exportar datos a Excel

**Checklist**:
- [ ] Instalar: `npm install xlsx file-saver`
- [ ] Crear `src/utils/exportToExcel.js`
- [ ] Agregar botón "Exportar" en cada List.jsx
- [ ] Implementar exportación con formato
- [ ] Agregar nombre de archivo con fecha
- [ ] Probar exportación con datos reales
- [ ] Commit: `feature: add Excel export functionality to all modules`
- [ ] Crear PR y mergear a `develop`

**Tiempo estimado**: 2 horas

---

#### Branch: `feature/023-dark-theme`
**Objetivo**: Implementar tema oscuro

**Checklist**:
- [ ] Crear `src/contexts/ThemeContext.js`
- [ ] Crear estilos CSS para tema oscuro
- [ ] Agregar toggle en navbar/header
- [ ] Persistir preferencia en localStorage
- [ ] Probar en todos los módulos
- [ ] Ajustar colores para accesibilidad
- [ ] Commit: `feature: implement dark theme with toggle`
- [ ] Crear PR y mergear a `develop`

**Tiempo estimado**: 4 horas

---

#### Branch: `feature/024-advanced-search`
**Objetivo**: Búsqueda avanzada por columnas

**Checklist**:
- [ ] Crear componente `AdvancedSearchFilter.jsx`
- [ ] Implementar filtros por columna
- [ ] Agregar selectores para campos específicos
- [ ] Implementar lógica de filtrado combinado
- [ ] Agregar botón "Limpiar filtros"
- [ ] Integrar en todos los módulos
- [ ] Commit: `feature: add advanced search filters by column`
- [ ] Crear PR y mergear a `develop`

**Tiempo estimado**: 5 horas

---

## 📊 RESUMEN DE BRANCHES

### Ramas de Seguridad (fix/chore)
1. ✅ `chore/001-env-security` - Proteger .env
2. ✅ `fix/002-error-handling-contexts` - Manejo de errores
3. ✅ `fix/003-token-key-rename` - Renombrar token
4. ✅ `fix/004-phone-validation` - Validar teléfonos
5. ✅ `fix/005-login-implementation` - Implementar login

### Ramas de Estabilidad (fix/refactor)
6. ✅ `fix/006-useeffect-dependencies` - Dependencias useEffect
7. ✅ `refactor/007-immutable-urls` - URLs inmutables
8. ✅ `refactor/008-spanish-messages` - Mensajes en español
9. ✅ `chore/009-remove-console-logs` - Eliminar console.log
10. ✅ `refactor/010-configurable-timeout` - Timeout configurable

### Ramas de Calidad (refactor/test/chore)
11. ✅ `feature/011-unit-tests` - Tests unitarios
12. ✅ `refactor/012-add-proptypes` - PropTypes
13. ✅ `refactor/013-generic-crud-hook` - Hook genérico CRUD
14. ✅ `refactor/014-reusable-validators` - Validadores reutilizables
15. ✅ `chore/015-update-package-json` - Actualizar package.json
16. ✅ `chore/016-eslint-prettier-setup` - ESLint y Prettier

### Ramas de Optimización (refactor/feature)
17. ✅ `refactor/017-optimize-table-filtering` - Optimizar filtrado
18. ✅ `feature/018-specific-loading-states` - Loading específicos
19. ✅ `docs/019-environment-variables` - Documentar env vars

### Ramas de Features (feature)
20. ✅ `feature/020-server-pagination` - Paginación servidor
21. ✅ `feature/021-react-query-integration` - React Query
22. ✅ `feature/022-excel-export` - Exportar Excel
23. ✅ `feature/023-dark-theme` - Tema oscuro
24. ✅ `feature/024-advanced-search` - Búsqueda avanzada

---

## 🎯 WORKFLOW RECOMENDADO

```bash
# 1. Crear la rama
git checkout develop
git pull origin develop
git checkout -b fix/002-error-handling-contexts

# 2. Realizar cambios según checklist
# ... hacer modificaciones ...

# 3. Probar cambios localmente
npm start
# Verificar que todo funciona

# 4. Commit
git add .
git commit -m "fix: add error handling to all context providers"

# 5. Push
git push origin fix/002-error-handling-contexts

# 6. Crear Pull Request en GitHub
# Revisar, aprobar y mergear a develop

# 7. Repetir para siguiente mejora
git checkout develop
git pull origin develop
git checkout -b fix/003-token-key-rename
```

---

## 📈 PROGRESO GENERAL

### Prioridad Alta (5 ramas)
- [ ] chore/001-env-security
- [ ] fix/002-error-handling-contexts
- [ ] fix/003-token-key-rename
- [ ] fix/004-phone-validation
- [ ] fix/005-login-implementation

### Prioridad Media (5 ramas)
- [ ] fix/006-useeffect-dependencies
- [ ] refactor/007-immutable-urls
- [ ] refactor/008-spanish-messages
- [ ] chore/009-remove-console-logs
- [ ] refactor/010-configurable-timeout

### Prioridad Baja (7 ramas)
- [ ] feature/011-unit-tests
- [ ] refactor/012-add-proptypes
- [ ] refactor/013-generic-crud-hook
- [ ] refactor/014-reusable-validators
- [ ] chore/015-update-package-json
- [ ] chore/016-eslint-prettier-setup
- [ ] docs/019-environment-variables

### Optimización (2 ramas)
- [ ] refactor/017-optimize-table-filtering
- [ ] feature/018-specific-loading-states

### Features Opcionales (5 ramas)
- [ ] feature/020-server-pagination
- [ ] feature/021-react-query-integration
- [ ] feature/022-excel-export
- [ ] feature/023-dark-theme
- [ ] feature/024-advanced-search

**Total**: 24 ramas / 0 completadas (0%)

---

## 📈 MÉTRICAS DE ÉXITO

Después de implementar las mejoras:

- ✅ 0 errores de seguridad (token seguro, .env protegido)
- ✅ 100% de operaciones con manejo de errores
- ✅ 0 console.log en producción
- ✅ Cobertura de tests > 60%
- ✅ 0 warnings de React en consola
- ✅ PropTypes en 100% de componentes
- ✅ Código duplicado reducido en 70%
- ✅ ESLint configurado y sin errores

---

**Última actualización**: 12 de noviembre de 2025  
**Autor**: Análisis automático del proyecto

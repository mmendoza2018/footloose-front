import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Definir estilos para el PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
    },
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: "#E5E4E4",
        padding: 10,
        marginBottom: 20,
        width: '100%',
        height: 280
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: 200,
        marginRight: 20,
        marginTop: 20,
    },
    section: {
        flex: 1,
        marginLeft: 20,
    },
    text: {
        marginBottom: 10,
        fontSize: 12,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

// Componente que genera el documento PDF
const ProductDocument = ({ product }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                <Image style={styles.image} src={`data:image/png;base64,${product.imageBase64}`} />
                <View style={styles.section}>
                    <Text style={styles.title}>Detalle del Producto</Text>
                    <Text style={[styles.text, styles.boldText]}>ID: {product.PROD_id}</Text>
                    <Text style={[styles.text, styles.boldText]}>Nombre: {product.PROD_nombre}</Text>
                    <Text style={[styles.text, styles.boldText]}>Precio: {product.PROD_precio_venta}</Text>
                    <Text style={[styles.text, styles.boldText]}>Marca: {product.MAR_descripcion}</Text>
                    <Text style={[styles.text, styles.boldText]}>Modelo: {product.MOD_descripcion}</Text>
                    <Text style={[styles.text, styles.boldText]}>Color: {product.COL_descripcion}</Text>
                    <Text style={[styles.text, styles.boldText]}>Talla: {product.TALL_descripcion}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default ProductDocument;

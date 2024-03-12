import { theme } from "../theme";

function Footer() {
    return (
        <div style={{ backgroundColor: theme.palette.grey[900],
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                    padding: 10 }}>
            Created for Operations Research and Logistics course by Arkadiusz Zając, Konrad Warzecha, Krzysztof Stajniak
        </div>
    )
}

export default Footer;
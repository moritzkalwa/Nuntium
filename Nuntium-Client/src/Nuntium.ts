import { ref, computed, type EmbedHTMLAttributes } from "vue"
import type { Ref } from "vue"

import { NuntiumAbi, contractAdress } from "@/NuntiumContract"
import type { AbiItem } from 'web3-utils'
import type { Contract } from "web3-eth-contract"
import type Web3Class from "web3"
import type FuseClass from "fuse.js"

declare let window: any
declare let Web3: Web3Class
export declare let Fuse: FuseClass<{title: string, text: string, publisher: string}>

export default class Nuntium {
    web3: typeof Web3 | undefined
    articles: Ref<Array<{title: string, text: string, publisher: string}>>
    nuntiumContract: Contract | undefined
    names: Record<string, string>

    constructor () {
        this.names = {}
        this.articles = ref([])
        this.initWeb3()
        this.createContract()
        this.reloadArticles()
        setInterval(this.reloadArticles, 1000)
    }

    initWeb3 = () => {
        // @ts-expect-error web3 sucks
        if (!this.web3 && window.ethereum) this.web3 = new Web3(window.ethereum)
    }

    createContract = () => {
        if (this.web3 && this.web3.eth)
        this.nuntiumContract = new this.web3.eth.Contract(NuntiumAbi as AbiItem[], contractAdress)
    }

    reloadArticles = async () => {
        if (!this.nuntiumContract) this.createContract()
        if (!this.nuntiumContract) return
        this.articles.value = await this.nuntiumContract.methods.getArticles().call().then((res: Array<any>) => 
            res.map((article: any) => { 
                this.getName(article.publisher).then((name) => {
                    if (name != '') this.names[article.publisher] = name
                })
                return {title: article.title, text: article.text, publisher: article.publisher } 
            }))
    }

    getArticle = async (id: Number) => {
        if (!this.nuntiumContract) this.createContract()
        if (!this.nuntiumContract) return
        return await this.nuntiumContract.methods.getArticle(id).call()
    }

    metaMaskInstalled = computed(() => {
        return window && window.ethereum
    })

    metaMaskEnabled = computed(() => {
        if (!this.metaMaskInstalled.value) return false
        this.initWeb3()
        this.reloadArticles()
        return this.web3?.eth.net.isListening()
    })

    enableMetaMask = () => {
        window.ethereum.enable()
    }

    publishArticle = async (title: string, text: string) => {
        if (!this.web3 || !this.web3.eth || !this.nuntiumContract || !this.web3.currentProvider) return
        if (!(this.web3.currentProvider as any).selectedAddress) await this.web3.eth.requestAccounts()
        this.nuntiumContract.methods.publishArticle(title, text).send({ from: (this.web3.currentProvider as any).selectedAddress })
    }

    getName = async (address: string) => {
        if (!this.web3 || !this.web3.eth || !this.nuntiumContract || !this.web3.currentProvider) return
        return this.nuntiumContract.methods.getProfileName(address).call()
    }
}

export type NuntiumArticle = {title?: string, text?: string, publisher?: string}